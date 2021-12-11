import * as React from "react";
import { useState, useEffect } from "react";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import { icons, SIZES, COLORS } from "../../constants";
import { styles } from "./style";
import { firestore, query, collection, getDocs, where, doc, getDoc, addDoc, deleteDoc } from "../../database/firebase";
import { Categoria } from "../Categoria";

const RecipeCreatorCardDetail = ({ selectedRecipe }) => {

    return (
        <View style={styles.recipeDetailView}>
            <View style={styles.labelView}>
                <Text style={styles.labelBy}>Informações</Text>
                <Text style={styles.labelName}>{selectedRecipe?.email}</Text>
                <Text style={styles.labelName}>{selectedRecipe?.especialidade}</Text>
            </View>
        </View>
    )
}
const RecipeCreatorCardInfo = ({ selectedRecipe }) => {
    return (
        <View style={styles.viewAndroid}>
            <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
        </View>
    )
}

export const Detalhes = ({ route, navigation }) => {
    const { informacao } = route.params;
    const { usuario } = route.params;
    const { especialidade } = route.params;

    const [data, setData] = useState([]);

    const buscarNutricionista = async () => {
        try {
            const r = query(collection(firestore, "alimentacao"), where("id", "==", informacao.id));
            const rSnapshot = await getDocs(r);
            let dados: any = [];
            rSnapshot.forEach((doc) => {
                const alimentos = {
                    id: doc.id,
                    nome: doc.data().nome,
                    tempo: doc.data().tempo,
                    categoria: doc.data().categoria,
                    calorias: doc.data().kcal,
                    image: doc.data().image,
                    profissional: doc.data().nutricionista_nome,
                    profissional_id: doc.data().id
                };
                dados.push(alimentos);
            });
            setData(dados);
        } catch (e) {
            console.log(e);
        }

    }
    const buscar = async () => {
        try {
            const q = query(collection(firestore, "exercicio"), where("id", "==", informacao.id));
            const querySnapshot = await getDocs(q);
            let dados: any = [];
            querySnapshot.forEach((doc) => {
                const receita = {
                    id: doc.id,
                    nome: doc.data().nome,
                    tempo: doc.data().tempo,
                    categoria: doc.data().categoria,
                    capacidade: doc.data().capacidade_fisica,
                    image: doc.data().image,
                    profissional: doc.data().instrutor_nome,
                    profissional_id: doc.data().id
                };
                dados.push(receita);
            });
            setData(dados);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if(especialidade == 'Instrutor físico'){
            buscar();
        }else{
            buscarNutricionista();
        }
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={item => `${item.id}`}
                ListHeaderComponent={
                    <View>
                        <View>
                            {/*RECIPE IMAGE*/}
                            <View style={styles.containerHeader}>
                                <Image source={informacao?.image} resizeMode='contain' style={styles.image} />
                            </View>
                            {/*CREATOR INFO*/}
                            <View style={styles.viewCreator}>
                                <RecipeCreatorCardInfo selectedRecipe={informacao} />
                            </View>
                        </View>
                        {/*INFO*/}
                    </View>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.info}>

                        <Image source={item.image} resizeMode='cover' style={{ width: 100, height: 100, borderRadius: SIZES.radius }} />

                        <View style={{ width: '65%', paddingHorizontal: 20 }}>
                            <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 20 }}>{item.nome}</Text>
                            <Text style={{ color: COLORS.gray }}>{item.tempo} mins</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.headerBarView}>
                {/*<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={icons.back} style={styles.iconBack} />
                </TouchableOpacity>*/}
            </View>
        </View>
    )
}