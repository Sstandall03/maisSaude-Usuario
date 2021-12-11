import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { styles } from "./style";
import { images, icons } from "../../constants";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

import { firestore, doc, getDoc, getDocs, collection, query, where } from "../../database/firebase";

import { VictoryChart } from "victory-chart";
import { VictoryGroup } from "victory-group";
import { VictoryBar } from "victory-bar";
import { VictoryLegend } from "victory-legend";

export function Perfil({ route, navigation }) {
    const { codigo } = route.params;
    const [nome, setNome] = useState('');
    const [imc, setImc] = useState(0);
    const [iac, setIac] = useState(0);
    const [caloriasCalc, setCaloriasCalc] = useState(0);
    const [tempoCalc, setTempoCalc] = useState(0);
    const [dataKCAL, setDataKCAL] = useState([]);
    const [dataTempo, setDataTempo] = useState([]);
    const [imagem, setImagem] = useState('');

    const grafico = async () => {
        const q = query(collection(firestore, "escolherAlimentacao"), where("usuario", "==", codigo));
        const querySnapshot = await getDocs(q);
        let dados: any = [];
        querySnapshot.forEach((doc) => {
            const kcal = {
                x: doc.data().data_escolha,
                y: parseFloat(doc.data().calorias)
            }
            dados.push(kcal);
        });
        setDataKCAL(dados);
    }

    const graficoTempo = async () => {
        try {
            const q = query(collection(firestore, "escolherExercicio"), where("usuario", "==", codigo));
            const querySnapshot = await getDocs(q);
            let dadosExercicio: any = [];
            querySnapshot.forEach((doc) => {
                const tempo = {
                    x: doc.data().data_escolha,
                    y: doc.data().tempo
                }
                dadosExercicio.push(tempo);
            });
            setDataTempo(dadosExercicio);
            console.log(dataTempo);
        }
        catch (e) {
            console.log(e);
        }
    }

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
    const imcIac = async () => {
        const docRef = doc(firestore, "usuario", codigo);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let peso1 = 0;
            let altura1 = 0;
            let cintura1 = 0;
            let imc = 0;
            let iac = 0;
            peso1 = docSnap.data().peso;
            altura1 = docSnap.data().altura;
            cintura1 = docSnap.data().cintura;
            imc = Math.round(peso1 / (altura1 * altura1));
            iac = Math.round((cintura1 / (altura1 * Math.sqrt(altura1))) - 18);
            setImc(imc);
            setIac(iac);
        }
        else {
            // doc.data() will be undefined in this case
            alert("Erro!");
        }
    }


    const calorias = async () => {
        try {
            const q = query(collection(firestore, "escolherAlimentacao"), where("usuario", "==", codigo));
            const querySnapshot = await getDocs(q);
            let kcal: number = 0;
            querySnapshot.forEach((doc) => {
                kcal = parseFloat(doc.data().calorias) + kcal;
            });
            setCaloriasCalc(kcal);
        } catch (e) {
            console.log(e);
        }
    }

    const tempo = async () => {
        try {
            const q = query(collection(firestore, "escolherExercicio"), where("usuario", "==", codigo));
            const querySnapshot = await getDocs(q);
            let tempo: number = 0;
            querySnapshot.forEach((doc) => {
                tempo = doc.data().tempo + tempo;
            });
            setTempoCalc(tempo);
        } catch (e) {
            console.log(e);
        }
    }

    const bookmarkAlimentacao = () =>{
        if(caloriasCalc > 0){
            navigation.navigate('BookmarkAlimentacao', {codigo: codigo});
        }else{
            navigation.navigate('Categoria');
        }
    }
    const bookmarkExercicio = () =>{
        if(tempoCalc > 0){
            navigation.navigate('Bookmark', {codigo: codigo});
        }else{
            navigation.navigate('Exercicio');
        }
    }

    useEffect(() => {
        navigation.addListener('focus', async () => {
            buscar(), imcIac(), calorias(), tempo(), grafico(), graficoTempo()
        })
    }, []);

    return (
        <View>
            <LinearGradient style={styles.container} colors={['#2c8434', '#4cb152', '#64ab67']}>
                <AntDesign style={styles.logout} name='login' size={40} onPress={() => navigation.navigate('Home')} />
                <Image source={imagem} style={styles.profilePic} />
                <View style={styles.profileDesc}>
                    <Text style={styles.textProfile}>{nome}</Text>
                    <Text style={styles.subtitleProfile}>Usuário</Text>
                </View>
            </LinearGradient>
            <ScrollView>
                <View>
                    <VictoryChart>
                        {/*<VictoryAxis label={'Dia'} />
                        <VictoryAxis dependentAxis />*/}
                        <VictoryGroup offset={20}>
                            <VictoryBar data={dataTempo} style={
                                {
                                    data: {
                                        fill: '#2c8434'
                                    },
                                }
                            } />
                            <VictoryBar data={dataKCAL} style={
                                {
                                    data: {
                                        fill: '#64ab67'
                                    },
                                }
                            } />

                        </VictoryGroup>
                        <VictoryLegend x={Dimensions.get('screen').width / 2 - 50} orientation='horizontal' gutter={20} data={[
                            {
                                name: 'Tempo (mins)',
                                symbol: {
                                    fill: '#2c8434'
                                }
                            },
                            {
                                name: 'KCAL',
                                symbol: {
                                    fill: '#64ab67'
                                }
                            }
                        ]} />
                    </VictoryChart>
                </View>
                <View style={styles.container2} >
                    <View style={styles.column}>
                        <View style={styles.card}>
                            <Image source={images.imcIcon} style={styles.icons} />
                            <Text style={styles.text}>IMC</Text>
                            <Text style={styles.subtitle}>{imc}</Text>
                        </View>
                        <View style={styles.card}>
                            <TouchableOpacity onPress={() => bookmarkAlimentacao()}>
                                <Image source={images.foodIcon} style={styles.icons} />
                                <Text style={styles.text}>Calorias</Text>
                                <Text style={styles.subtitle}>{caloriasCalc} kcal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.column2}>
                        <View style={styles.card}>
                            <Image source={images.iacIcon} style={styles.icons} />
                            <Text style={styles.text}>IAC</Text>
                            <Text style={styles.subtitle}>{iac}</Text>
                        </View>
                        <View style={styles.card}>
                            <TouchableOpacity onPress={() => bookmarkExercicio()}>
                                <Image source={icons.relogio} style={styles.icons} />
                                <Text style={styles.text}>Tempo</Text>
                                <Text style={styles.subtitle}>{tempoCalc} mins</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}