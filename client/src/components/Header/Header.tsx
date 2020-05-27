import React, { CSSProperties, useState } from 'react'
import { Link } from 'react-router-dom'

// MATERIAL UI
import { Typography, Grid, Container, IconButton } from '@material-ui/core'


import useMediaQuery from '@material-ui/core/useMediaQuery'

// STYLES
import useStyles from "./headerStyles"
import { CartIcon } from '../CartIcon'

// COMPONENTS
import LoginModal from "../LoginModal/LoginModal"

// CONTEXTS
import { CartContext } from "../../contexts/cartContext"


export default function Header() {
    const classes = useStyles()
    const logo: any = require("../items/images/logo.png")




    return (
        <CartContext.Consumer>
            {(cartState: any) => (
                <>
                    <Container maxWidth={false} className={classes.root}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >

                            <Link to="/" className={classes.logoContainer}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid item className={classes.logoWrapper}>
                                        <img src={logo} alt="logo" className={classes.logoImg} />
                                    </Grid>
                                </Grid>
                            </Link>
                        </Grid>
                    </Container>
                    <div className={classes.cartIcon}>
                        <CartIcon cartState={cartState} />
                    </div>
                </>
            )}
        </CartContext.Consumer>
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