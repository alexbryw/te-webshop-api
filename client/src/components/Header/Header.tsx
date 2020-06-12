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
    const logo: any = require("../items/images/te_te_logo.png")


    return (
        <>
            <Grid container
                direction="row"
                alignItems="center"
                className={classes.root}>


                <Grid item>
                    <LoginModal userContext={props.userContext} buttonHandle="logga in" />

                    {!props.userContext.admin && props.userContext.loggedIn ?
                        <UserOrderHistory orderContext={props.orderContext} userContext={props.userContext} /> : null
                    }

                </Grid>

                <Link to="/" className={classes.logo}>
                    <img src={logo} alt="logo" className={classes.logoImg} />
                </Link>





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
                            <Button variant="contained" color="primary" onClick={() => props.userContext.changeAdminView("products")}>
                                Produkter
                                        </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/admin">
                            <Button variant="contained" color="primary" onClick={() => props.userContext.changeAdminView("orders")}>
                                Beställningar
                                        </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/admin">
                            <Button variant="contained" color="primary" onClick={() => props.userContext.changeAdminView("users")}>
                                Användare
                                        </Button>
                        </Link>
                    </Grid>
                </Grid>
            }
        </>
    )
}