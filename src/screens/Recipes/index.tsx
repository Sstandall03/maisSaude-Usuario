import * as React from "react";
import { useState, useEffect } from "react";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "../../constants";
import { styles } from "./style";
import { firestore, query, collection, getDocs, where , doc, getDoc, addDoc, deleteDoc} from "../../database/firebase"; 

const RecipeCreatorCardDetail = ({ selectedRecipe, usuario }) => {

    const [imagem, setImagem] = useState('');

    const [bookmark, setBookmark] = useState(icons.bookmark);

    const [escolha, setEscolha] = useState('');

    const escolhido = async() =>{
        const exercicioRef = collection(firestore, "escolherAlimentacao");
        const q = query(exercicioRef, where("usuario", "==", usuario), where('alimentacao', '==', selectedRecipe.id));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setBookmark(icons.bookmarkFilled);
            setEscolha(doc.id);
        });
    }

    const procurar = async() =>{
        const nomeRef = doc(firestore, "profissional", selectedRecipe?.profissional_id);
        const nomeSnap = await getDoc(nomeRef);
    
            if (nomeSnap.exists()) {
                let picture = '';
                picture = nomeSnap.data().image;
                setImagem(picture);
            }
    }

    const escolher = async() =>{
        try{
            if(bookmark == icons.bookmark){
                const usuarioRef = collection(firestore, "escolherAlimentacao");
                const q = query(usuarioRef, where('usuario', '==', usuario));

                const querySnapshot =  await getDocs(q);
                    const docRef = await addDoc(collection(firestore, "escolherAlimentacao"), {
                        usuario: usuario,
                        alimentacao: selectedRecipe.id,
                        calorias: selectedRecipe.calorias,
                        data_escolha: new Date().toLocaleDateString(),
                        nome: selectedRecipe.nome,
                        tempo: selectedRecipe.tempo,
                        categoria: selectedRecipe.categoria,
                        image: selectedRecipe.image,
                        profissional: selectedRecipe.profissional,
                        profissional_id: selectedRecipe.profissional_id
                    });
                setEscolha(docRef.id);
                setBookmark(icons.bookmarkFilled);
            }else{
                await deleteDoc(doc(firestore, "escolherAlimentacao", escolha));
                setBookmark(icons.bookmark);
            }
        } catch (e) {
            console.log(e);
        }  
    }

    useEffect(() => {
        procurar(), escolhido()
    }, []);
    return (
        <View style={styles.recipeDetailView}>
            <View style={styles.profilePicView}>
                <Image source={imagem} style={styles.profilePic} />
            </View>
            <View style={styles.labelView}>
                <Text style={styles.labelBy}>Recipe by: </Text>
                <Text style={styles.labelName}>{selectedRecipe?.profissional}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => escolher()}>
                <Image source={bookmark} style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}
const RecipeCreatorCardInfo = ({ selectedRecipe, usuario }) => {
    return (
        <View style={styles.viewAndroid}>
            <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} usuario={usuario} />
        </View>
    )
}
export const Recipe = ({ route, navigation }) => {
    const { recipe } = route.params;
    const { usuario } = route.params;
    const [data, setData] = useState([]); 

    console.log(recipe);

    const buscar = async () => {
        try {
            const q = query(collection(firestore, "ingrediente"), where("id", "==", recipe.id));
            const querySnapshot = await getDocs(q); 
            let dados: any = [];
            querySnapshot.forEach((doc) => {
                const receita = {
                    id: doc.id,
                    nome: doc.data().nome,
                    quantidade: doc.data().quantidade,
                    medida: doc.data().medida,
                };
                dados.push(receita);
            });
            setData(dados);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
       buscar()
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
                                <Image source={recipe?.image} resizeMode='contain' style={styles.image} />
                            </View>
                            {/*CREATOR INFO*/}
                            <View style={styles.viewCreator}>
                                <RecipeCreatorCardInfo selectedRecipe={recipe} usuario={usuario}/>
                            </View>
                        </View>
                        {/*INFO*/}
                        <View style={styles.recipeInfoCard}>
                            <View style={styles.recipeInfoView}>
                                <Text style={{ fontSize: 25 }}>{recipe?.nome}</Text>
                                <Text style={styles.subtitleInfo}>{recipe?.tempo} mins | {recipe?.calorias} kcal</Text>
                            </View>
                        </View>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.containerAll}>
                        <View style={styles.containerIngredients}>
                            <Text>{item.nome}</Text>
                        </View>
                        <View style={styles.containerQuantidade}>
                            <Text>{item.quantidade} {item.medida}</Text>
                        </View>
                    </View>
                )}
            />
            <View style={styles.headerBarView}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={icons.back} style={styles.iconBack} />
                </TouchableOpacity>
            </View>
        </View>
    )
}