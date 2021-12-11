import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import { TextInput, View, Button, Text, Image } from "react-native";
import {styles} from './style';
import logo from '../../assets/logo-verde.png';

import {firestore, getDocs, collection,where, query } from "../../database/firebase";

export function Login({navigation}){
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');

    let logado = false;
    let cd = '';

    const logar = () =>{
        if(email.length == 0 || senha.length == 0){
            console.log('Campos em branco');
        }else{
            const verifica = async() =>{
                try{
                    const usuarioRef = collection(firestore, "usuario");
                    const q = query(usuarioRef, where("email", "==", email), where("senha", "==", senha));

                    const querySnapshot =  await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        //console.log(doc.id, " => ", doc.data().email, doc.data().senha);
                        cd = doc.id;
                        logado = true;
                    });
                    if(logado){
                        navigation.navigate('Tabs', {id: cd});
                    }else{
                        alert('Usuário ou senha incorretos');
                    }
                }catch(e){
                    console.log(e);
                }
            }
            verifica();
            
        }
    }

    return(
        <View style={styles.container}>
            <Image source={logo} style={styles.image}/>
            <TextInput placeholderTextColor="#000" placeholder='Email' keyboardType='email-address'
            textContentType='emailAddress' style={styles.input} onChangeText={text => setEmail(text)}/>
            <TextInput placeholderTextColor="#000" placeholder='Senha' 
            secureTextEntry={true} maxLength={10}
            keyboardType='default' style={styles.input} onChangeText={text => setSenha(text)} />
            <View style={styles.button}>
                <Button title="Login" color="#4cb050" onPress={() => logar()}/>
            </View>    
            <Text style={styles.subtitle}>OU</Text>
            <View style={styles.button}>
                <Button title='Cadastre-se' color='#4cb050' onPress={() => navigation.navigate('Cadastro')}/>
            </View>    
        </View>
    );
}