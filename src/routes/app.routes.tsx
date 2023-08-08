import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../pages/Dashboard';
import Order from '../pages/Dashboard';
import FinishOrder from '../pages/FinishOrder';

type ItemProps = {
    //id: string;
    product_id: string | undefined;
    name: string;
    //amount: string | number;
    amount: number;
}

export type StackParamsList = {
    Dashboard: undefined;
    Order: undefined;/*{
        number: number | string;
        order_id: string;
    };*/
    FinishOrder: {
        number: number | string; // numero da mesa
        listItem: ItemProps[]
    };
}
const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Dashboard" 
                component={Dashboard} 
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="FinishOrder"
                component={FinishOrder} 
                options={{
                    title: 'Finalizando',
                    headerStyle:{
                      backgroundColor: '#1d1d2e'
                    },
                    headerTintColor: '#FFF'
                }}
            />
        </Stack.Navigator>
    )
}
export default AppRoutes;