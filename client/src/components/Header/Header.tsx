import React, { CSSProperties, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// MATERIAL UI
import { Grid, Button } from '@material-ui/core'

// STYLES
import useStyles from "./headerStyles"
import { Cart } from '../Cart/Cart'

// COMPONENTS
import LoginModal from "../LoginModal/LoginModal"
import UserOrderHistory from "../UserOrderHistory/UserOrderHistory"

// CONTEXTS
import { CartContext } from "../../contexts/NewCartContext"
import { UserContext } from '../../contexts/UserContext'
import { ProductContext } from '../../contexts/ProductContext'

interface Props {
    orderContext: any;
    userContext: any
}

export default function Header(props: Props) {
    const classes = useStyles()
    const logo: any = require("../items/images/te_te_logo.png")


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


                                        {!props.userContext.admin && props.userContext.loggedIn ?
                                            <UserOrderHistory orderContext={props.orderContext} userContext={props.userContext} /> : null
                                        }



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
                                                        Produkter
                                        </Button>
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link to="/admin">
                                                    <Button variant="outlined" color="secondary" onClick={() => userContext.changeAdminView("orders")}>
                                                        Beställningar
                                        </Button>
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link to="/admin">
                                                    <Button variant="outlined" color="secondary" onClick={() => userContext.changeAdminView("users")}>
                                                        Användare
                                        </Button>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    }
                                </>
                            )}
                        </CartContext.Consumer>
                    )}
                </UserContext.Consumer >
            )
            }
        </ProductContext.Consumer >
    )
}