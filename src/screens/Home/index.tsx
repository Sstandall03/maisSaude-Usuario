import * as React from "react";
import { View, Text, Image, Button, Alert } from 'react-native';
import {styles} from './styles';
import img1  from '../../assets/image1.jpg';

export function Home({navigation}){
    return(
        <View style={styles.container}>
            <Image source={img1} style={styles.img}/>
            <View style={styles.content}>
                <Text style={styles.title}>Mantenha-se saudável {'\n'} sem sair de sua casa</Text>
                <Text style={styles.subtitle}>Faça exercícios e alimente-se bem {'\n'} com o auxílio de profissionais da saúde</Text>
                <Button title='Login' color='#159182' onPress={() => navigation.navigate('Login')}/>
            </View>       
        </View>
    );
}
