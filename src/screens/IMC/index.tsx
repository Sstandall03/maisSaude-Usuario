import * as React from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from "./style";
import { RadioButton, Provider, Portal, Modal, Button } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";

export function IMC() {
    const [visible, setVisible] = React.useState(false);

    //const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [checked, setChecked] = React.useState('');
    const [peso, setPeso] = React.useState('');
    const [altura, setAltura] = React.useState('');
    const [imcCalculo, setImcCalculo] = React.useState('');
    
    let imc = 0;
    
    const calcular = () => {
        let classificacao = "";
        if (imc <= 18.5)
            classificacao = "Abaixo do peso";
        else if (imc >= 18.6 && imc <= 24.9)
            classificacao = "Saudável";
        else if (imc >= 25 && imc <= 29.9)
            classificacao = "Peso em excesso";
        else if (imc >= 30 && imc <= 34.9)
            classificacao = "Obesidade Grau I";
        else if (imc >= 35 && imc <= 39.9)
            classificacao = "Obesidade Grau II (severa)";
        else
            classificacao = "Obesidade Grau III (mórbida)";
        imc = parseFloat(peso) / (parseFloat(altura) * parseFloat(altura));
        
        setVisible(!visible);
        setImcCalculo(classificacao);
        
    }

    return (
        <View style={styles.imc}>
            <Text style={styles.text}>IMC</Text>
            <TextInputMask style={styles.input} type={'custom'}
                options={{ mask: '999' }}
                placeholder='Peso'
                value={peso}
                onChangeText={text => setPeso(text)}
            />
            <TextInputMask style={styles.input} type={'custom'}
                options={{ mask: '9.99' }}
                placeholder='Altura'
                value={altura}
                onChangeText={text => setAltura(text)}
            />
            <View style={styles.radioButton}>
                <RadioButton value="first"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('first')}
                />
                <Text>Feminino</Text>
                <RadioButton
                    value="second"
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('second')}
                />
                <Text>Masculino</Text>
            </View>
            <View>
                <Provider>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                            <Text style={{fontSize: 20, marginBottom: 5}}>Classificação</Text>
                            <Text>{imcCalculo}</Text>
                            <Button onPress={hideModal}>
                            <Text style={styles.button}>Fechar</Text>
                    </Button>
                        </Modal>
                    </Portal>
                    <Button onPress={() => calcular()}>
                    <Text style={styles.button}>Calcular</Text>
                    </Button>
                </Provider>
            </View>
        </View>

    );
}