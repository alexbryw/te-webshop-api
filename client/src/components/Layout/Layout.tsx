import React, { CSSProperties } from 'react'
import Header from '../Header/Header';
import Home from '../home/Home';
import Footer from '../Footer/Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import CheckOut from './checkout/CheckOut';
import ProductPage from '../product/ProductPage';
import AdminLayout from '../admin/AdminLayout';
import CheckoutWrapper from '../checkout/CheckoutWrapper';

import { UserContext } from "../../contexts/UserContext"
import { ProductContext } from "../../contexts/ProductContext"
import { Container } from '@material-ui/core';

import useStyles from "./LayoutStyles"

const Layout = () => {
    const classes = useStyles()

    return (
        <ProductContext.Consumer>
            {(productContext) => (
                <UserContext.Consumer>
                    {userContext => (
                        <BrowserRouter>

                            <Header />
                            <Container className={classes.root}>


                                <Switch>
                                    <Route exact path={userContext.admin ? "/home" : "/"}>
                                        <Home productContext={productContext} />
                                    </Route>
                                    <Route exact path={userContext.admin ? "/" : ""}>
                                        <AdminLayout userContext={userContext} />
                                    </Route>
                                    <Route path={userContext.loggedIn ? "/checkout" : ""}>
                                        <CheckoutWrapper />
                                    </Route>
                                    <Route exact path="/product">
                                        <div><h2>Select a product</h2></div>
                                    </Route>
                                    <Route path="/product/:id">
                                        <ProductPage />
                                    </Route>
                                </Switch>


                            </Container>
                            <Footer />
                        </BrowserRouter>

                    )}
                </UserContext.Consumer>
            )}
        </ProductContext.Consumer>
    );
}

export default Layout;