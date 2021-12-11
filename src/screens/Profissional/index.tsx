import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, FlatList, Button } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { styles } from "./style";
import { SIZES, COLORS, icons } from "../../constants";
import { Picker } from '@react-native-picker/picker';
//import panqueca from '../../assets/images/recipes/panqueca.jpg';

import { firestore, doc, getDoc, collection, query, where, getDocs } from "../../database/firebase";

export function Profissional({ navigation, route }) {
    const { codigo } = route.params;
    //const { recipe } = route.params;
    const [data, setData] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('AC');
    const [selectedProfissional, setSelectedProfissional] = useState('Instrutor físico');
    const [filter, setFilter] = useState([]);

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
            const alimentacaoRef = collection(firestore, "profissional");
            const q = query(alimentacaoRef, where("uf", "==", selectedLanguage), where('especialidade', '==', selectedProfissional));

            const querySnapshot = await getDocs(q);
            let dados: any = [];
            querySnapshot.forEach((doc) => {
                const profissional = {
                    id: doc.id,
                    nome: doc.data().nome,
                    email: doc.data().email,
                    especialidade: doc.data().especialidade,
                    image: doc.data().image,
                    uf: doc.data().uf
                }
                dados.push(profissional);
            });
            setData(dados);
            setFilter(dados);
        } catch (e) {
            console.log(e);
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
                        <Picker
                            style={styles.picker2}
                            onBlur={() => buscar()}
                            selectedValue={selectedProfissional}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedProfissional(itemValue)
                            }>
                            <Picker.Item label="Instrutor físico" value="Instrutor físico" />
                            <Picker.Item label="Nutricionista" value="Nutricionista" />
                        </Picker>
                        <Picker
                            style={styles.picker2}
                            onBlur={() => buscar()}
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedLanguage(itemValue)
                            }>
                            <Picker.Item label="AC" value="AC" />
                            <Picker.Item label="AL" value="AL" />
                            <Picker.Item label="AP" value="AP" />
                            <Picker.Item label="AM" value="AM" />
                            <Picker.Item label="BA" value="BA" />
                            <Picker.Item label="CE" value="CE" />
                            <Picker.Item label="ES" value="ES" />
                            <Picker.Item label="GO" value="GO" />
                            <Picker.Item label="MA" value="MA" />
                            <Picker.Item label="MT" value="MT" />
                            <Picker.Item label="MS" value="MS" />
                            <Picker.Item label="MG" value="MG" />
                            <Picker.Item label="PA" value="PA" />
                            <Picker.Item label="PB" value="PB" />
                            <Picker.Item label="PR" value="PR" />
                            <Picker.Item label="PE" value="PE" />
                            <Picker.Item label="PI" value="PI" />
                            <Picker.Item label="RJ" value="RJ" />
                            <Picker.Item label="RN" value="RN" />
                            <Picker.Item label="RS" value="RS" />
                            <Picker.Item label="RO" value="RO" />
                            <Picker.Item label="RR" value="RR" />
                            <Picker.Item label="SC" value="SC" />
                            <Picker.Item label="SP" value="SP" />
                            <Picker.Item label="SE" value="SE" />
                            <Picker.Item label="TO" value="TO" />
                            <Picker.Item label="DF" value="DF" />
                        </Picker>

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
                    }} onPress={() => navigation.navigate("Detalhes", { informacao: item, usuario: codigo, especialidade: selectedProfissional })}>

                        <Image source={item.image} resizeMode='cover' style={{ width: 100, height: 100, borderRadius: SIZES.radius }} />

                        <View style={{ width: '65%', paddingHorizontal: 20 }}>
                            <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 20 }}>{item.nome}</Text>
                            <Text style={{ color: COLORS.gray }}>{item.email} | {item.uf} </Text>
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