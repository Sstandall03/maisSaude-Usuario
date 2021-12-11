import * as React from "react";
import {useState, useEffect} from 'react';
import {View, FlatList, Text, Image, TouchableOpacity} from "react-native";
import { icons } from "../../constants";
import { styles } from "./style";

import {firestore, doc, getDoc, collection, query, getDocs, addDoc, where, deleteDoc} from '../../database/firebase';

const RecipeCreatorCardDetail = ({selectedRecipe, usuario}) => {
    const [imagem, setImagem] = useState('');

    const [bookmark, setBookmark] = useState(icons.bookmark);

    const [escolha, setEscolha] = useState('');

    const escolhido = async() =>{
        const exercicioRef = collection(firestore, "escolherExercicio");
        const q = query(exercicioRef, where("usuario", "==", usuario), where('exercicio', '==', selectedRecipe.id));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setBookmark(icons.bookmarkFilled);
            setEscolha(doc.id);
        });
    }

    const procurar = async() =>{
        const nomeRef = doc(firestore, "profissional", selectedRecipe.profissional_id);
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
                const usuarioRef = collection(firestore, "escolherExercicio");
                const q = query(usuarioRef, where('usuario', '==', usuario));

                const querySnapshot =  await getDocs(q);
                    const docRef = await addDoc(collection(firestore, "escolherExercicio"), {
                        usuario: usuario,
                        exercicio: selectedRecipe.id,
                        tempo: selectedRecipe.tempo,
                        data_escolha: new Date().toLocaleDateString(),
                        nome: selectedRecipe.nome,
                        categoria: selectedRecipe.categoria,
                        capacidade: selectedRecipe.capacidade,
                        image: selectedRecipe.image,
                        profissional: selectedRecipe.profissional,
                        profissional_id: selectedRecipe.profissional_id
                    });
                setEscolha(docRef.id);
                setBookmark(icons.bookmarkFilled);
            }else{
                await deleteDoc(doc(firestore, "escolherExercicio", escolha));
                setBookmark(icons.bookmark);
            }
        } catch (e) {
            console.log(e);
        }  
    }
    useEffect(() => {
        procurar(), escolhido()
    }, []);
    return(
        <View style={styles.recipeDetailView}>
            <View style={styles.profilePicView}>
                <Image source={imagem} style={styles.profilePic}/>
            </View>
            <View style={styles.labelView}>
                <Text style={styles.labelBy}>Exercise by: </Text>
                <Text style={styles.labelName}>{selectedRecipe.profissional}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => escolher()}>
                <Image source={bookmark} style={styles.icon}/>
            </TouchableOpacity>
        </View>
    )
}

const RecipeCreatorCardInfo = ({selectedRecipe, usuario}) =>{
        return(
             <View style={styles.viewAndroid}>
                 <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} usuario={usuario} />
             </View>
        ) 
    } 

export const Exercise = ({route, navigation}) => {
    const {exercise} = route.params;
    const {usuario} = route.params;

    return(
        <View style={styles.container}>
                <FlatList 
                    data={exercise?.test}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item}) =>(
                        <Text></Text>
                    )}
                    ListHeaderComponent={
                        <View>
                            <View>
                                {/*exercise IMAGE*/}
                                <View style={styles.containerHeader}>
                                    <Image source={exercise.image} resizeMode='contain' style={styles.image} />
                                </View>
                                {/*CREATOR INFO*/}
                                <View style={styles.viewCreator}>
                                    <RecipeCreatorCardInfo selectedRecipe={exercise} usuario={usuario} />
                                </View>
                            </View>
                                <View style={styles.recipeInfoView}>
                                    <Text style={{fontSize: 30, textAlign: 'center', marginTop: 50}}>{exercise.nome}</Text>
                                    <View style={styles.column}>
                                        <View>
                                            <Image source={icons.relogio} style={styles.icons}/>
                                            <Text style={styles.subtitleInfo}>{exercise.tempo} mins</Text>
                                        </View>
                                        <View>
                                            <Image source={icons.categoria} style={styles.icons}/>
                                            <Text style={styles.subtitleInfo}>{exercise.categoria}</Text>
                                        </View>
                                        <View>
                                            <Image source={icons.resistencia} style={styles.icons}/>
                                            <Text style={styles.subtitleInfo}>{exercise.capacidade}</Text>
                                        </View>
                                    </View>
                                    
                                 </View>
                            
                        </View>
                    }
                    
                />
                <View style={styles.headerBarView}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Image source={icons.back} style={styles.iconBack} />
                    </TouchableOpacity>
                </View>
        </View>
    )
}