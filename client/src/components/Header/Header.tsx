import React, { CSSProperties, useState } from 'react'
import { Link } from 'react-router-dom'

// MATERIAL UI
import { Typography, Grid, Container, IconButton, Button } from '@material-ui/core'



// STYLES
import useStyles from "./headerStyles"
import { Cart } from '../Cart/Cart'

// COMPONENTS
import LoginModal from "../LoginModal/LoginModal"

// CONTEXTS
import { CartContext } from "../../contexts/cartContext"
import { UserContext } from '../../contexts/UserContext'
import { ProductContext } from '../../contexts/ProductContext'


export default function Header() {
    const classes = useStyles()
    const logo: any = require("../items/images/logo.png")

    return (
        <ProductContext.Consumer>
            {productContext => (
                <UserContext.Consumer>
                    {userContext => (
                        <CartContext.Consumer>
                            {(cartContext) => (
                                <>
                                    <Grid container
                                        direction="row"
                                        alignItems="center"
                                        className={classes.root}>

                                        {userContext.loggedIn ?
                                            <Button variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                onClick={() => userContext.logOut()}
                                            >logga ut </Button>
                                            :
                                            <LoginModal userContext={userContext} buttonHandle="logga in" />}

                                        <Link to="/" className={classes.logo}>
                                            <img src={logo} alt="logo" className={classes.logoImg} />
                                        </Link>


                                        <div className={classes.cartIcon}>
                                            <Cart cartContext={cartContext} userContext={userContext} productContext={productContext} />
                                        </div>
                                    </Grid>

                                    {userContext.admin &&
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-evenly"
                                            alignItems="center"
                                            className={classes.adminBar}
                                        >
                                            <Grid item>
                                                <Link to="/admin">
                                                    <Button variant="outlined" color="secondary" onClick={() => userContext.changeAdminView("products")}>
                                                        products
                                        </Button>
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link to="/admin">
                                                    <Button variant="outlined" color="secondary" onClick={() => userContext.changeAdminView("orders")}>
                                                        orders
                                        </Button>
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link to="/admin">
                                                    <Button variant="outlined" color="secondary" onClick={() => userContext.changeAdminView("users")}>
                                                        users
                                        </Button>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    }
                                </>
                            )}
                        </CartContext.Consumer>
                    )}
                </UserContext.Consumer>
            )}
        </ProductContext.Consumer>
    )
}