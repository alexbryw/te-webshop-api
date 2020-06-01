import React, { CSSProperties, useState } from 'react'
import { Link } from 'react-router-dom'

// MATERIAL UI
import { Typography, Grid, Container, IconButton, Button } from '@material-ui/core'


import useMediaQuery from '@material-ui/core/useMediaQuery'

// STYLES
import useStyles from "./headerStyles"
import { Cart } from '../Cart'

// COMPONENTS
import LoginModal from "../LoginModal/LoginModal"

// CONTEXTS
import { CartContext } from "../../contexts/cartContext"
import { UserContext } from '../../contexts/UserContext'


export default function Header() {
    const classes = useStyles()
    const logo: any = require("../items/images/logo.png")




    return (
        <UserContext.Consumer>
            {(userContext) => (
                <CartContext.Consumer>
                    {(cartState: any) => (
                        <>
                            <Grid container className={classes.root}>
                                {userContext.loggedIn ?
                                    <Button variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => userContext.logOut()}
                                    >logga ut </Button>
                                    :
                                    <LoginModal userContext={userContext} buttonHandle="logga in" />}
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Link to="/" className={classes.logoContainer}>

                                        <Grid item className={classes.logoWrapper}>
                                            <img src={logo} alt="logo" className={classes.logoImg} />
                                        </Grid>

                                    </Link>
                                </Grid>
                                <div className={classes.cartIcon}>
                                    <Cart cartState={cartState} userContext={userContext} />
                                </div>
                            </Grid>


                        </>
                    )}
                </CartContext.Consumer>
            )}
        </UserContext.Consumer>
    )
}

const headerStyle: CSSProperties = {
    backgroundColor: '#346933',
    width: '100vw',
    height: '8em',
    padding: '1em',
    margin: '0 0 1em 0',
}

const textLogoStyle: CSSProperties = {
    WebkitTextStroke: '0.02em black',
}

const shoppingLogoPos: CSSProperties = {
    position: 'relative',
}

const wave: CSSProperties = {
    // backgroundImage: `url(${require("./items/images/wave.png")})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center'
}