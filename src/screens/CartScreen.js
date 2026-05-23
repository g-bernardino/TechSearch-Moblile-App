import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../contexts/CartContext'; // Importa a memória do carrinho

export default function CartScreen({ navigation }) {
  // Puxa as variáveis do nosso Contexto
  const { cart, removeFromCart, clearCart, total } = useContext(CartContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePayment = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) return Alert.alert('Erro', 'Seu dispositivo não possui sensor biométrico.');

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) return Alert.alert('Aviso', 'Nenhuma biometria cadastrada.');

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Confirme para pagar R$ ' + total.toFixed(2),
      fallbackLabel: 'Usar senha',
    });

    if (auth.success) {
      setIsAuthenticated(true);
      Alert.alert(
        'Pagamento Aprovado!', 
        'Sua compra foi finalizada com sucesso.',
        [{ 
          text: 'Voltar ao Início', 
          onPress: () => {
            clearCart(); // Esvazia o carrinho depois de comprar
            navigation.navigate('Main');
          } 
        }]
      );
    } else {
      Alert.alert('Falha', 'Não foi possível confirmar sua identidade.');
    }
  };

  // Se o carrinho estiver vazio
  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color="#333333" />
        <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar às compras</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo da Compra</Text>
      
      {/* Lista de Produtos */}
      <FlatList 
        data={cart}
        keyExtractor={(item, index) => item.id + index.toString()} // Evita erro se adicionar itens iguais
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={24} color="#D9534F" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Rodapé com Total e Pagamento */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPrice}>R$ {total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.payButton, isAuthenticated && styles.payButtonSuccess]} 
          onPress={handlePayment}
          disabled={isAuthenticated}
        >
          <Ionicons name={isAuthenticated ? "checkmark-circle" : "finger-print"} size={24} color={isAuthenticated ? "#FFF" : "#111111"} style={styles.icon} />
          <Text style={[styles.payButtonText, isAuthenticated && styles.textWhite]}>
            {isAuthenticated ? 'Pagamento Concluído' : 'Pagar com Biometria'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111111', padding: 20 },
  emptyContainer: { flex: 1, backgroundColor: '#111111', justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#9CA3AF', fontSize: 18, marginTop: 10, marginBottom: 20 },
  backButton: { backgroundColor: '#1E1E1E', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, borderWidth: 1, borderColor: '#333333' },
  backButtonText: { color: '#00b8cc', fontSize: 16, fontWeight: 'bold' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#FFFFFF' },
  card: { flexDirection: 'row', backgroundColor: '#1E1E1E', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#333333', marginBottom: 10, alignItems: 'center' },
  image: { width: 50, height: 50, resizeMode: 'contain', marginRight: 15 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#00b8cc', marginTop: 4 },
  deleteButton: { padding: 10 },
  footer: { marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#333333' },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  totalText: { fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' },
  totalPrice: { fontSize: 24, color: '#00b8cc', fontWeight: 'bold' },
  payButton: { flexDirection: 'row', backgroundColor: '#00b8cc', paddingVertical: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  payButtonSuccess: { backgroundColor: '#2E8B57' },
  icon: { marginRight: 10 },
  payButtonText: { color: '#111111', fontSize: 18, fontWeight: 'bold' },
  textWhite: { color: '#FFFFFF' }
});