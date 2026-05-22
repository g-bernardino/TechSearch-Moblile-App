import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Acesso negado', 'Precisamos da permissão da câmera para buscar por foto.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      Alert.alert(
        'Busca Visual', 
        'Analisando imagem... Encontramos produtos semelhantes!',
        [{ text: 'Ver Resultados', onPress: () => navigation.navigate('ProdutosTab') }]
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header de Boas-Vindas */}
      <View style={styles.welcomeHeader}>
        <Text style={styles.greeting}>Olá, Dev!</Text>
        <Text style={styles.subGreeting}>Encontre os melhores setups de hardware aqui.</Text>
      </View>

      {/* Nova Posição do Sensor: Barra de Busca Inteligente por Imagem */}
      <View style={styles.searchSection}>
        <TouchableOpacity style={styles.fakeSearchInput} onPress={openCamera}>
          <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
          <Text style={styles.placeholderText}>Busque produtos usando sua câmera...</Text>
          <View style={styles.cameraIconBadge}>
            <Ionicons name="camera" size={20} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Banner de Destaque */}
      <View style={styles.promoBanner}>
        <Ionicons name="flash" size={32} color="#FFF" style={styles.bannerIcon} />
        <View>
          <Text style={styles.bannerTitle}>Upgrade de Inverno</Text>
          <Text style={styles.bannerSubtitle}>Até 20% de desconto em periféricos</Text>
        </View>
      </View>


    <View style={styles.categoriesGrid}>
        <TouchableOpacity 
          style={styles.categoryCard}
          onPress={() => navigation.navigate('ProdutosTab', { category: 'hardware' })}
        >
          <Ionicons name="laptop-outline" size={28} color="#1E90FF" />
          <Text style={styles.categoryLabel}>Hardware</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.categoryCard}
          onPress={() => navigation.navigate('ProdutosTab', { category: 'smartphones' })}
        >
          <Ionicons name="phone-portrait-outline" size={28} color="#1E90FF" />
          <Text style={styles.categoryLabel}>Smartphones</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.categoryCard}
          onPress={() => navigation.navigate('ProdutosTab', { category: 'perifericos' })}
        >
          <Ionicons name="game-controller-outline" size={28} color="#1E90FF" />
          <Text style={styles.categoryLabel}>Periféricos</Text>
        </TouchableOpacity>
    </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111', // NOVO FUNDO GLOBAL
  },
  welcomeHeader: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#1E1E1E', // Fundo de card escuro para contrastar
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF', // Texto Branco
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 15,
    color: '#9CA3AF', // Cinza claro
    marginTop: 2,
    fontWeight: '400',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  fakeSearchInput: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E', // Card escuro
    borderRadius: 12,
    alignItems: 'center',
    paddingLeft: 16,
    height: 54,
    borderWidth: 1,
    borderColor: '#333333', // Borda escura
  },
  searchIcon: {
    marginRight: 10,
    color: '#666',
  },
  placeholderText: {
    color: '#666',
    fontSize: 14,
    flex: 1,
  },
  cameraIconBadge: {
    backgroundColor: '#00b8cc', // NOVO AZUL
    height: '100%',
    width: 54,
    borderTopRightRadius: 11,
    borderBottomRightRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoBanner: {
    backgroundColor: '#00b8cc', // NOVO AZUL
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  bannerIcon: {
    marginRight: 16,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#E0F2FE',
    fontSize: 13,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto Branco
    marginHorizontal: 20,
    marginBottom: 14,
  },
  categoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  categoryCard: {
    backgroundColor: '#1E1E1E', // Card escuro
    width: '30%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D1D5DB', // Cinza clarinho
    marginTop: 8,
  },
});