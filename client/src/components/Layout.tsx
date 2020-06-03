import React, { CSSProperties } from "react";
import Header from "./Header/Header";
import Home from "./home/Home";
import Footer from "./Footer/Footer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import CheckOut from './checkout/CheckOut';
import ProductPage from "./product/ProductPage";
import Admin from "./admin/Admin";
import CheckoutWrapper from "./checkout/CheckoutWrapper";


import { ProductContext } from "../contexts/ProductContext";

interface Props {}
interface State {}
export default class Layout extends React.Component<Props, State> {
  render() {
    return (
      <BrowserRouter>
        <Header />

        <Switch>
          <Route path="/checkout">
            <CheckoutWrapper />
          </Route>

          <Route path="/admin">
            <Admin />
          </Route>

          <Route exact path="/product">
            <div>
              <h2>Select a product</h2>
            </div>
          </Route>

          <Route path="/product/:id">
            <ProductPage />
          </Route>

          <Route exact path="/">
            <ProductContext.Consumer>
              {(productContext) => <Home productContext={productContext} />}
            </ProductContext.Consumer>
          </Route>
        </Switch>

        <Footer />
      </BrowserRouter>
    );
  }
}
