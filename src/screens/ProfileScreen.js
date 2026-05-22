import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState('https://picsum.photos/id/1005/200/200');

  const changeProfilePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permissão Negada', 'Precisamos de acesso à sua galeria para mudar a foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={changeProfilePhoto} style={styles.avatarContainer}>
          <Image source={{ uri: profileImage }} style={styles.avatar} />
          <View style={styles.editBadge}>
            <Ionicons name="camera" size={16} color="#111111" />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.name}>Usuário Desenvolvedor</Text>
        <Text style={styles.email}>dev@tecnologia.com.br</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="cart-outline" size={24} color="#00b8cc" />
          <Text style={styles.menuText}>Meus Pedidos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="#00b8cc" />
          <Text style={styles.menuText}>Configurações da Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={24} color="#00b8cc" />
          <Text style={styles.menuText}>Ajuda e Suporte</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.menuItemLogout]}>
          <Ionicons name="log-out-outline" size={24} color="#D9534F" />
          <Text style={styles.menuTextLogout}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  header: {
    backgroundColor: '#1E1E1E', // Header do perfil escuro
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#00b8cc', // Borda ciano na foto
  },
  editBadge: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    backgroundColor: '#00b8cc', // Badge ciano
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1E1E1E',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  email: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Itens do menu escuros
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  menuItemLogout: {
    marginTop: 20,
    borderColor: 'rgba(217, 83, 79, 0.2)',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  menuTextLogout: {
    fontSize: 16,
    marginLeft: 15,
    color: '#D9534F',
    fontWeight: 'bold',
  },
});