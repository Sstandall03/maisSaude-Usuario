import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { styles } from "./style";
import { SIZES, COLORS, icons, images, data } from "../../constants";
import panqueca from '../../assets/images/recipes/panqueca.jpg';

import { firestore, doc, getDoc, collection, query, where, getDocs } from "../../database/firebase";

export function Alimentacao({ navigation, route }) {
    const { codigo } = route.params;
    const { recipe } = route.params;
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);

    //const [dataIngrediente, setDataIngrediente] = useState([]);

    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState('');

    const buscarNome = async () => {
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
    const buscar = async () => {
        try {
            const alimentacaoRef = collection(firestore, "alimentacao");
            const q = query(alimentacaoRef, where("categoria", "==", recipe));

            const querySnapshot = await getDocs(q);
            let dados: any = [];
            querySnapshot.forEach((doc) => {
                const alimentacao = {
                    id: doc.id,
                    nome: doc.data().nome,
                    tempo: doc.data().tempo,
                    categoria: doc.data().categoria,
                    calorias: doc.data().kcal,
                    image: doc.data().image,
                    profissional: doc.data().nutricionista_nome,
                    profissional_id: doc.data().id
                }
                dados.push(alimentacao);
            });
            setData(dados);
            setFilter(dados);
        } catch (e) {
            console.log(e);
        }
    }

    const searchFilter = (text) =>{
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
    }

    useEffect(() => {
            buscarNome(), buscar()
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={false} />
            <FlatList
                data={filter}
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
                            <TouchableOpacity onPress={() => navigation.navigate("Perfil", { codigo: codigo, name: nome })}>
                                <Image source={imagem} style={styles.imageHeader} />
                            </TouchableOpacity>
                        </View>
                        {/*SEARCHBAR*/}
                        <View style={styles.viewSearchBar}>
                            <Image source={icons.search} style={styles.iconSearchBar} />
                            <TextInput style={styles.inputSearchBar} placeholder="Procure algum ingrediente" value={search} onChangeText={(text) => searchFilter(text)} />
                        </View>
                    </View>
                }
                renderItem={({ item }) => {
                    return (<TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        marginTop: 10,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.gray2,
                        marginHorizontal: 24
                    }} onPress={() => navigation.navigate("Recipe", { recipe: item, usuario: codigo })}>

                        <Image source={item.image} resizeMode='cover' style={{ width: 100, height: 100, borderRadius: SIZES.radius }} />

                        <View style={{ width: '65%', paddingHorizontal: 20 }}>
                            <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 20 }}>{item.nome}</Text>
                            <Text style={{ color: COLORS.gray }}>{item.tempo} | {item.calorias} kcal</Text>
                        </View>
                    </TouchableOpacity>
                    )
                }}
                ListFooterComponent={
                    <View style={styles.footer} />
                }
            />
        </SafeAreaView>
    );
}