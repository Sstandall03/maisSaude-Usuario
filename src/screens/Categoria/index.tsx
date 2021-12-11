import * as React from "react";
import { useState, useEffect } from "react";
import {View, Text, Image, SafeAreaView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { StatusBar } from "expo-status-bar";
import { styles } from "./style";
import {dataExercise } from "../../constants";

import { firestore, doc, getDoc } from "../../database/firebase";

export function Categoria({navigation, route}){
    const {codigo} = route.params;

    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState('');

    const buscar = async () => {
        const docRef = doc(firestore, "usuario", codigo);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let teste = '';
            let picture = '';
            teste = docSnap.data().nome;
            picture = docSnap.data().image;
            setNome(teste);
            setImagem(picture);
        }
        
        else {
            // doc.data() will be undefined in this case
            alert("Erro!");
        }
    }

    useEffect(() => {
      buscar()
  }, [])
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={false}/>
            <FlatList 
                data={dataExercise.categories}
                keyExtractor={item => `${item.id}`}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                         {/*HEADER*/}
                        <View style={styles.ViewHeader1}>
                            <View style={styles.ViewHeader2}>
                                <Text style={styles.titleHeader}>Olá, {nome}</Text>
                                <Text style={styles.subtitleHeader}>Como você irá se manter saudável hoje?</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate("Perfil", {codigo: codigo, name: nome})}>
                                <Image source={imagem} style={styles.imageHeader}/>
                             </TouchableOpacity>
                        </View>
                    </View>
                }
                renderItem={({item}) => {
                    return(<TouchableOpacity style={styles.cards} onPress={() => navigation.navigate("Alimentação", {codigo: codigo, recipe: item.id})}>
                            
                         <Image source={item.image} resizeMode='cover' style={styles.image}/>
                
                         <View style={{width: '65%', paddingHorizontal: 20}}>
                            <Text style={{flex: 1, fontWeight: 'bold', fontSize: 20}}>{item.name}</Text>
                         </View>
                    </TouchableOpacity>
                    )
                }}
                ListFooterComponent={
                    <View style={styles.footer}/> 
                }
            />
        </SafeAreaView>
    );
}