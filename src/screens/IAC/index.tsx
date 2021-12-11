import * as React from "react";
import { View, Text, TouchableOpacity, /*, Modal, Pressable*/ } from 'react-native';
import { styles } from "./style";
import { RadioButton, Modal, Provider, Portal, Button } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
//import Modal from 'react-native-modal';
//import Button from 'react-native-modal';

export function IAC() {

    const [visible, setVisible] = React.useState(false);

    //const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [checked, setChecked] = React.useState('');
    const [quadril, setQuadril] = React.useState('');
    const [altura, setAltura] = React.useState('');
    const [iacClassificacao, setIacClassificacao] = React.useState('');

    let genero = "";
    let iac = 0;
    
    const calcular = () => {
        let classificacao = '';
        if (checked == 'first')
            genero = 'Feminino';
        else
            genero = 'Masculino';

        iac = (parseFloat(quadril) / (parseFloat(altura) * Math.sqrt(parseFloat(altura)))) - 18;
        switch (genero) {
            case 'Feminino':
                if (iac < 21)
                    classificacao = "Adiposidade abaixo do normal";
                else if (iac >= 21 && iac <= 32)
                    classificacao = "Adiposidade Normal";
                else if (iac >= 33 && iac <= 38)
                    classificacao = "Sobrepeso";
                else
                    classificacao = "Obesidade";
                break;
            case 'Masculino':
                if (iac < 8)
                    classificacao = "Adiposidade abaixo do normal";
                else if (iac >= 8 && iac <= 20)
                    classificacao = "Adiposidade Normal";
                else if (iac >= 21 && iac <= 25)
                    classificacao = "Sobrepeso";
                else
                    classificacao = "Obesidade";
                break;
        }

        setVisible(!visible);
        setIacClassificacao(classificacao)
    }

    return (
        <View style={styles.iac}>
            <Text style={styles.text}>IAC</Text>

            <TextInputMask style={styles.input2} type={'custom'}
                options={{ mask: '99' }}
                placeholder='Cintura'
                value={quadril}
                onChangeText={text => setQuadril(text)}
            />

            <TextInputMask style={styles.input2} type={'custom'}
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
                            <Text style={{fontSize: 20, marginBottom: 5,}}>Classificação</Text>
                            <Text>{iacClassificacao}</Text>
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