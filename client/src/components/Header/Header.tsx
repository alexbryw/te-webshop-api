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

interface Props {
    orderContext: any;
    userContext: any
    cartContext: any
    productContext: any
}

export default function Header(props: Props) {
    const classes = useStyles()
    const logo: any = require("../items/images/logo.png")


    return (
        <>
            <Grid container
                direction="row"
                alignItems="center"
                className={classes.root}>

                {props.userContext.loggedIn ?
                    <Button variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => props.userContext.logOut()}
                    >logga ut </Button>
                    :
                    <LoginModal userContext={props.userContext} buttonHandle="logga in" />}

                <Link to="/" className={classes.logo}>
                    <img src={logo} alt="logo" className={classes.logoImg} />
                </Link>


                {!props.userContext.admin && props.userContext.loggedIn ?
                    <UserOrderHistory orderContext={props.orderContext} userContext={props.userContext} /> : null
                }



                <div className={classes.cartIcon}>
                    <Cart cartContext={props.cartContext} userContext={props.userContext} productContext={props.productContext} />
                </div>
            </Grid>

            {props.userContext.admin &&
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    className={classes.adminBar}
                >
                    <Grid item>
                        <Link to="/admin">
                            <Button variant="outlined" color="primary" onClick={() => props.userContext.changeAdminView("products")}>
                                products
                                        </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/admin">
                            <Button variant="outlined" color="primary" onClick={() => props.userContext.changeAdminView("orders")}>
                                orders
                                        </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/admin">
                            <Button variant="outlined" color="primary" onClick={() => props.userContext.changeAdminView("users")}>
                                users
                                        </Button>
                        </Link>
                    </Grid>
                </Grid>
            }
        </>
    )
}