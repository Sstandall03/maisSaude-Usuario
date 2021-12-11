import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import { TextInput, View, Button, Image, ScrollView } from "react-native";
import {styles} from './style';
import logo from '../../assets/logo-verde.png';
import {TextInputMask} from 'react-native-masked-text';
import * as ImagePicker from 'expo-image-picker';
import { Constants } from "expo-constants";

import {firestore, addDoc, collection, query, where, getDocs, doc} from "../../database/firebase";

export function Cadastro({navigation}){
    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const[peso, setPeso] = useState('');
    const[altura, setAltura] = useState('');
    const[cintura, setCintura] = useState('');
    const[date, setDate] = useState('');

    const [image, setImage] = useState('file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fversao-eee39e44-1b22-4084-88ef-d5c4b0bfcd76/ImagePicker/25fb82db-eced-4233-8a80-d56fa53397b3.jpg');

    let validaEmail = false;

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })
        console.log(result)
        if(!result.cancelled){
            setImage(result.uri);
        }
    }

    const cadastro = () =>{
        if(nome.length == 0 || email.length == 0 || senha.length == 0 || peso.length == 0 || altura.length == 0 || cintura.length == 0){
            alert("Campos em branco");
        }else{
            let cinturaNumber = parseFloat(cintura);
            let pesoNumber = parseFloat(peso);
            let alturaNumber = parseFloat(altura);

            const verifica = async() => {
                try{
                    const usuarioRef = collection(firestore, "usuario");
                    const q = query(usuarioRef, where("email", "==", email));

                    const querySnapshot =  await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        //console.log(doc.id, " => ", doc.data());
                        validaEmail = true;
                    });
                    if(validaEmail){
                        alert('Email já cadastrado');
                    }else{
                        const docRef = await addDoc(collection(firestore, "usuario"), {
                            nome: nome,
                            email: email,
                            senha: senha,
                            peso: pesoNumber,
                            altura: alturaNumber,
                            cintura: cinturaNumber,
                            data_nascimento: date,
                            image: {uri: image}
                          });
                          navigation.navigate('Login');
                    }    
                } catch (e) {
                    console.log(e);
                }  
              }
            verifica();
        }
    }
    
    return(
        <View style={styles.container}>
            <Image source={logo} style={styles.image}/> 
            <ScrollView style={styles.scroll}>
                <TextInput textContentType='name' maxLength={80} placeholder='Nome' style={styles.input} onChangeText={text => setNome(text)} />
                <TextInputMask style={styles.input} type={'datetime'} 
                    options={{format: 'DD/MM/YYYY'}}
                    placeholder='Data de nascimento'
                    value={date}
                    onChangeText={text => setDate(text)}
                />
                <TextInputMask style={styles.input} type={'custom'} 
                    options={{mask: '99.99'}}
                    placeholder='Peso'
                    value={peso}
                    onChangeText={text => setPeso(text)}
                />
                <TextInputMask style={styles.input} type={'custom'} 
                    options={{mask: '9.99'}}
                    placeholder='Altura'
                    value={altura}
                    onChangeText={text => setAltura(text)}
                />
                <TextInputMask style={styles.input} type={'custom'} 
                    options={{mask: '99'}}
                    placeholder='Cintura'
                    value={cintura}
                    onChangeText={text => setCintura(text)}
                />
                <TextInput textContentType='emailAddress' maxLength={80} placeholder='Email' style={styles.input} onChangeText={text => setEmail(text)} />
                <TextInput textContentType='newPassword' maxLength={10} placeholder='Senha' secureTextEntry={true} style={styles.input} onChangeText={text => setSenha(text)}/> 
                <View style={styles.container}>
                    <Image source={{uri: image}} style={styles.profile} />
                </View>
                <View style={styles.button}>
                    <Button title='Escolha uma foto' color='#4cb050' onPress={() => pickImage()}/>
                </View> 
            
                <View style={styles.button}>
                    <Button title='Cadastre-se' color='#4cb050' onPress={() => cadastro()}/>
                </View>    
            </ScrollView>
        </View>
    );
}