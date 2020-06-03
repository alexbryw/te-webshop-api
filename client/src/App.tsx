import React from 'react';
import Layout from './components/Layout';
import Theme from './MuiTheme'

import UserContextProvider from "./contexts/UserContext"
import { ThemeProvider } from '@material-ui/core/styles';
import { CartProvider } from './contexts/cartContext';
import OrderContextProvider from './contexts/OrderContext';

function App() {
  return (
    <OrderContextProvider>
      <UserContextProvider>
        <CartProvider>
          <ThemeProvider theme={Theme}>
            <Layout />
          </ThemeProvider>
        </CartProvider>
      </UserContextProvider>
    </OrderContextProvider>
  );
}

export default App;