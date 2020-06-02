import React from 'react';
import Layout from './components/Layout';
import Theme from './MuiTheme'

import UserContextProvider from "./contexts/UserContext"
import ProductContextProvider from "./contexts/ProductContext"
import { ThemeProvider } from '@material-ui/core/styles';
import { CartProvider } from './contexts/cartContext';

function App() {
  return (
    <ProductContextProvider>
    <UserContextProvider>
      <CartProvider>
        <ThemeProvider theme={Theme}>
          <Layout />
        </ThemeProvider>
      </CartProvider>
    </UserContextProvider>
    </ProductContextProvider>
  );
}

export default App;