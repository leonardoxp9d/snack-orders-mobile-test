import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

import { api } from '../../services/api';
import Toast from 'react-native-toast-message';


type ItemProps = {
    product_id: string;
    name: string;
    amount: number;
}

type RouteDetailParams = {
    FinishOrder: {
        number: string | number;

        listItem: ItemProps[];
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder() {
    const route = useRoute<FinishOrderRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function handleFinish(){
        try{
            const order = await api.post('/order', {
                table: route.params?.number,
            })

            for(let i = 0; i < route.params?.listItem.length; i++) {
                await api.post('/order/add', {
                    order_id: order.data.id,
                    product_id: route.params?.listItem[i].product_id,
                    amount: route.params?.listItem[i].amount,
                })
            }

            Toast.show({
                type: 'success',
                text1: `Pedido Finalizado com sucesso! 😁`,
                visibilityTime: 4000,
            });
      
            navigation.popToTop();
      
          }catch(err){
            console.log("ERRO AO FINALIZAR, tente mais tarde")
          }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
            <Text style={styles.title}>
                Mesa {/*{route.params?.number} */}
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton}>Finalizar pedido</Text>
                <Feather name="shopping-cart" size={20} color="#1d1d2e" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    alert: {
        fontSize:20,
        color: '#FFF',
        fontWeight:'bold',
        marginBottom: 12,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#3fffa3',
        flexDirection: 'row',
        width: '65%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    textButton: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: '#1d1d2e'
    }
})