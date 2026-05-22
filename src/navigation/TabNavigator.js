import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'ProdutosTab') iconName = focused ? 'basket' : 'basket-outline';
          else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00b8cc', // Novo Azul/Ciano ativo
        tabBarInactiveTintColor: '#666666', // Cinza para inativo
        
        tabBarStyle: {
          backgroundColor: '#111111', // Fundo da barra inferior
          borderTopColor: '#222222', // Linha de separação sutil
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

        headerStyle: { 
          backgroundColor: '#111111', // Fundo do header
          elevation: 0, 
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#222222' // Linha sutil separando o topo
        },
        headerTintColor: '#00b8cc', // Título no novo azul
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: '700', fontSize: 20 },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerTitle: 'TechSearch', tabBarLabel: 'Início' }} 
      />
      <Tab.Screen 
        name="ProdutosTab" 
        component={ListScreen} 
        options={{ headerTitle: 'Nossos Produtos', tabBarLabel: 'Produtos' }} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{ headerTitle: 'Meu Perfil', tabBarLabel: 'Perfil' }} 
      />
    </Tab.Navigator>
  );
}