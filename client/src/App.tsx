import React from 'react';
import Layout from './components/Layout/Layout';
import Theme from './MuiTheme'

import UserContextProvider from "./contexts/UserContext"
import { ThemeProvider } from '@material-ui/core/styles';
import { CartProvider } from './contexts/cartContext';

function App() {
  return (
    <UserContextProvider>
      <CartProvider>
        <ThemeProvider theme={Theme}>
          <Layout />
        </ThemeProvider>
      </CartProvider>
    </UserContextProvider>
  );
}

export default App;