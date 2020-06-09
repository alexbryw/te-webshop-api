import React from 'react';
import Layout from './components/Layout/Layout';
import Theme from './MuiTheme'

import UserContextProvider from "./contexts/UserContext"
import { ThemeProvider } from '@material-ui/core/styles';
import { NewCartProvider } from './contexts/NewCartContext';
import OrderContextProvider from './contexts/OrderContext';
import ProductContextProvider from "./contexts/ProductContext";


function App() {
  return (
    <OrderContextProvider>
      <ProductContextProvider>
      <UserContextProvider>
        <NewCartProvider>
          <ThemeProvider theme={Theme}>
            <Layout />
          </ThemeProvider>
        </NewCartProvider>
      </UserContextProvider>
      </ProductContextProvider>
    </OrderContextProvider>
  );
}

export default App;
