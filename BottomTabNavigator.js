import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'; 
import Cadastrar from './Cadastrar';
import Lista from './Lista';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
  <Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{
      tabBarLabel: 'Home',
      tabBarIcon: () => <MaterialCommunityIcons name="home" size={32} color="#3498db" />,
      tabBarLabelStyle: {
        fontSize: 18, // Ajuste o tamanho da fonte conforme necessário
      },
    }}
  />
  <Tab.Screen
    name="Cadastrar Livro"
    component={Cadastrar}
    options={{
      tabBarLabel: 'Buscar Livro',
      tabBarIcon: () => <MaterialCommunityIcons name="magnify" size={32} color="#3498db" />,
      tabBarLabelStyle: {
        fontSize: 18, // Ajuste o tamanho da fonte conforme necessário
        color: "#3498db",
      },
    }}
  />
  <Tab.Screen
    name="Lista de Livros"
    component={Lista}
    options={{
      tabBarLabel: 'Lista',
      tabBarIcon: () => <MaterialCommunityIcons name="book" size={32} color="#3498db" />,
      tabBarLabelStyle: {
        fontSize: 18, // Ajuste o tamanho da fonte conforme necessário
        color: "#3498db",
      },
    }}
  />
</Tab.Navigator>

  );
};

export default BottomTabNavigator;