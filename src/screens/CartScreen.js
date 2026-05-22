import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen({ route, navigation }) {
  const { product } = route.params;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePayment = async () => {
    // 1. Verifica se o aparelho tem sensor biométrico
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert('Erro', 'Seu dispositivo não possui sensor biométrico.');
      return;
    }

    // 2. Verifica se há alguma digital/rosto cadastrado no aparelho
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert('Aviso', 'Nenhuma biometria cadastrada neste dispositivo.');
      return;
    }

    // 3. Pede a autenticação
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Confirme sua identidade para pagar',
      fallbackLabel: 'Usar senha',
    });

    // 4. Se der sucesso, finaliza a compra
    if (auth.success) {
      setIsAuthenticated(true);

      Alert.alert(
        'Pagamento Aprovado!', 
        `Sua compra do ${product.name} foi finalizada com sucesso.`,
        [{ text: 'Voltar ao Início', onPress: () => navigation.navigate('Main') }]
      );
    } else {
      Alert.alert('Falha na Autenticação', 'Não foi possível confirmar sua identidade.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo da Compra</Text>
      
      <View style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.payButton, isAuthenticated && styles.payButtonSuccess]} 
        onPress={handlePayment}
        disabled={isAuthenticated}
      >
        <Ionicons 
          name={isAuthenticated ? "checkmark-circle" : "finger-print"} 
          size={24} 
          color={isAuthenticated ? "#FFF" : "#111111"} 
          style={styles.icon} 
        />
        <Text style={[styles.payButtonText, isAuthenticated && styles.textWhite]}>
          {isAuthenticated ? 'Pagamento Concluído' : 'Pagar com Biometria'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 30,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00b8cc',
    marginTop: 5,
  },
  payButton: {
    flexDirection: 'row',
    backgroundColor: '#00b8cc',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonSuccess: {
    backgroundColor: '#2E8B57', // Fica verde ao aprovar
  },
  icon: {
    marginRight: 10,
  },
  payButtonText: {
    color: '#111111',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textWhite: {
    color: '#FFFFFF',
  }
});