import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './src/screens/Home';
import { Login } from './src/screens/Login';
import { Cadastro } from './src/screens/Cadastro';
import { Recipe } from './src/screens/Recipes';
import { Exercise } from './src/screens/Exercises';
import { Bookmark } from './src/screens/Bookmark';
import { BookmarkAlimentacao } from './src/screens/BookmarkAlimentacao';
import { Tabs } from './src/tabs';
import { Alimentacao } from './src/screens/Alimentacao';
import { Detalhes } from './src/screens/ProfissionalDetail';

const Stack = createNativeStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(245, 245, 245, 245)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ header: () => null }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Alimentação" component={Alimentacao} />
        <Stack.Screen name="Recipe" component={Recipe} options={{ headerShown: false }} />
        <Stack.Screen name="Exercise" component={Exercise} options={{ headerShown: false }} />
        <Stack.Screen name="Bookmark" component={Bookmark} />
        <Stack.Screen name="BookmarkAlimentacao" component={BookmarkAlimentacao} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

