import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { mockProducts } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';

export default function ListScreen({ route, navigation }) {
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const categoryFilter = route.params?.category;

  useEffect(() => {
    if (categoryFilter) {
      const filtered = mockProducts.filter(item => item.category === categoryFilter);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(mockProducts);
    }
  }, [categoryFilter]);

  const clearFilter = () => {
    navigation.setParams({ category: null });
  };

  const renderItem = ({ item }) => (
    <ProductCard
      data={item}
      onPress={() => navigation.navigate('Detail', { product: item })}
    />
  );

  return (
    <View style={styles.container}>
      {categoryFilter && (
        <View style={styles.filterHeader}>
          <Text style={styles.filterText}>
            Mostrando: <Text style={styles.filterHighlight}>{categoryFilter.toUpperCase()}</Text>
          </Text>
          <TouchableOpacity onPress={clearFilter} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111', // Fundo escuro
  },
  listContainer: {
    paddingVertical: 16,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#1E1E1E', // Fundo do filtro escuro
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  filterText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  filterHighlight: {
    fontWeight: 'bold',
    color: '#00b8cc', // Destaque ciano
  },
  clearButton: {
    backgroundColor: '#00b8cc', // Botão ciano
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#111111', // Texto escuro dentro do botão claro para contraste
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#64748B',
  }
});