import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  // Extraímos o produto passado como parâmetro
  const { product } = route.params;

  const handleBuy = () => {
    // Navega para o carrinho passando o produto
    navigation.navigate('Cart', { product: product });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Container da imagem com fundo escuro de contraste */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        {/* Preço no novo Ciano */}
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        
        {/* Título da seção em cinza claro */}
        <Text style={styles.sectionTitle}>Descrição do Produto</Text>
        {/* Descrição em branco/cinza claríssimo */}
        <Text style={styles.description}>{product.description}</Text>
      </View>

      {/* Botão de compra Ciano com texto Preto */}
      <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
        <Text style={styles.buyButtonText}>Comprar Agora</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111', 
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#1E1E1E', 
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333333', 
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', 
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00b8cc', 
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3AF', 
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#D1D5DB', 
    lineHeight: 24,
    marginBottom: 30,
  },
  buyButton: {
    backgroundColor: '#00b8cc', 
    marginHorizontal: 20,
    marginBottom: 40, 
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  buyButtonText: {
    color: '#111111', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});