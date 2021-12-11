import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Exercicio } from "../screens/Exercicio";
import { IMC } from "../screens/IMC";
import { IAC } from "../screens/IAC";
import { Perfil } from "../screens/Perfil";
import { Categoria } from "../screens/Categoria";
import { Profissional } from "../screens/Profissional";

const Tab = createBottomTabNavigator();

export function Tabs({route}){

  const {id} = route.params;

    return(
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Exercício') {
              iconName = focused ? 'dumbbell' : 'dumbbell';
            } else if (route.name === 'Categoria') {
              iconName = focused ? 'apple' : 'apple';
            } else if (route.name === 'IMC' || route.name === 'IAC') {
                iconName = focused ? 'calculator' : 'calculator';
              } else if (route.name === 'Perfil') {
                iconName = focused ? 'user' : 'user';
              } else if(route.name == 'Profissional'){
                iconName = focused ? 'map-marker-alt' : 'map-marker-alt';
              }

            // You can return any component that you like here!
            return <Icons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4cb050',
          tabBarInactiveTintColor: 'gray',
        })}>        
            <Tab.Screen name='Categoria' component={Categoria} initialParams={{codigo: id}} options={{headerShown: false, title: ''}}></Tab.Screen>                
            <Tab.Screen name='Exercício' component={Exercicio} initialParams={{codigo: id}}  options={{headerShown: false, title: ''}}></Tab.Screen>
            <Tab.Screen name='Profissional' component={Profissional} initialParams={{codigo: id}}  options={{headerShown: false, title: ''}}></Tab.Screen>  
            <Tab.Screen name='IMC' component={IMC} options={{headerShown: false, title: ''}}></Tab.Screen>                
            <Tab.Screen name='IAC' component={IAC} options={{headerShown: false, title: ''}}></Tab.Screen>                
            <Tab.Screen name='Perfil' component={Perfil} initialParams={{codigo: id}}  options={{headerShown: false, title: ''}}></Tab.Screen>                                      
        </Tab.Navigator>
    );
}