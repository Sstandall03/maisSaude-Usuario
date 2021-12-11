import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { styles } from "./style";
import { SIZES, COLORS } from "../../constants";

import { firestore, collection, query, getDocs, getDoc, doc, where } from '../../database/firebase';

export function Bookmark({ navigation, route }) {
    const { codigo } = route.params;
    const [data, setData] = useState([]);
    const [nome, setNome] = useState('');
  //const [search, setSearch] = useState('');
  //const [filter, setFilter] = useState([]);

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
            alert("Erro!");
        }
    }

    const list = async () => {
        try {
            const exercicioRef = collection(firestore, "escolherExercicio");
            const q = query(exercicioRef, where('usuario', '==', codigo));
            const querySnapshot = await getDocs(q);
            let dados: any = [];
            querySnapshot.forEach((doc) => {
                const exercise = {
                        id: doc.data().exercicio,
                        nome: doc.data().nome,
                        tempo: doc.data().tempo,
                        categoria: doc.data().categoria,
                        capacidade: doc.data().capacidade,
                        image: doc.data().image,
                        profissional: doc.data().profissional,
                        profissional_id: doc.data().profissional_id
                }
                dados.push(exercise);
            });
            setData(dados);
        } catch (e) {
            console.log(e);
        }
    }

    /*const searchFilter = (text) =>{
        if(text){
            const newData = data.filter((item) => {
                const itemData = item.nome ? 
                    item.nome.toLowerCase() 
                    : ''.toLowerCase();
                const textData = text.toLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilter(newData);
            setSearch(text);
        }else{
            setFilter(data);
            setSearch(text);
        }
    }*/

    useEffect(() => {
        navigation.addListener('focus', async() => {
            buscar(), list()
        })
    }, []);


    const renderItem = ({ item }) => {
        return (<TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("Exercise", { exercise: item, usuario: codigo })}
        >

            <Image source={item.image} resizeMode='cover' style={{ width: 100, height: 100, borderRadius: SIZES.radius }} />

            <View style={{ width: '65%', paddingHorizontal: 20 }}>
                <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 20 }}>{item.nome}</Text>
                <Text style={{ color: COLORS.gray }}>{item.tempo} mins | {item.categoria} </Text>
            </View>
        </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={false} />
            <FlatList
                data={data}
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
                            <TouchableOpacity onPress={() => navigation.navigate("Perfil", { codigo: codigo })}>
                                <Image source={imagem} style={styles.imageHeader} />
                            </TouchableOpacity>
                        </View>
                        {/*SEARCHBAR*/}
                        {/*<View style={styles.viewSearchBar}>
                            <TouchableOpacity>
                                <Image source={icons.search} style={styles.iconSearchBar} />
                            </TouchableOpacity>
                            <TextInput style={styles.inputSearchBar} value={search} placeholder="Procure algum exercício" onChangeText={(text) => searchFilter(text)} />
                        </View>*/}
                    </View>
                }
                renderItem={renderItem}
                ListFooterComponent={
                    <View style={styles.footer} />
                }
            />
        </SafeAreaView>
    );
}