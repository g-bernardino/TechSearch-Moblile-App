import React, { createContext, useState } from 'react';

// Cria o contexto
export const CartContext = createContext();

// Cria o provedor que vai "abraçar" o aplicativo
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Função para adicionar produto
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Função para remover produto específico
  const removeFromCart = (productId) => {
    // Mantém todos os itens que têm o ID diferente do que queremos remover
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
  };

  // Função para esvaziar o carrinho após a compra
  const clearCart = () => {
    setCart([]);
  };

  // Calcula o valor total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}