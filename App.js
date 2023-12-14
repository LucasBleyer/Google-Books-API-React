import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import BottomTabNavigator from './BottomTabNavigator';
import RegistrarConta from './RegistrarConta';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Deslogar" component={BottomTabNavigator} />
        <Stack.Screen name="RegistrarConta" component={RegistrarConta} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;