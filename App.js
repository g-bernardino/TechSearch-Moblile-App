import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/contexts/CartContext'; 

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}