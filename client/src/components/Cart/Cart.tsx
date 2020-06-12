import React, { useState, CSSProperties } from 'react'
import { Link as RouterLink } from 'react-router-dom'

// MATERIAL UI
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
    IconButton,
    Button,
    Typography,
    makeStyles,
    Theme
} from '@material-ui/core'


// ICONS
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

// COMPONENTS
import ShoppingCart from '../ShoppingCart'
import LoginModal from "../LoginModal/LoginModal"

// INTERFACES
import { CartItem } from '../../interfaces/interfaces'

// STYLES
import useStyles from "./CartStyles"


interface Props {
    cartContext: any
    userContext: any
    productContext: any
}



export function Cart(props: Props) {

    const classes = useStyles()

    function TotalProductCount(cartList: Array<CartItem>) {
        let totalCount = 0
        for (const item of cartList) {
            totalCount += item.nrItems
        }
        return totalCount
    }

    let screenSize = useMediaQuery('(min-width:430px)')
    let divSize = { width: '18.5rem' }
    if (screenSize === true) {
        divSize = { width: '25rem' }
    }

    const cart = <div className={classes.cart}>

        {props.cartContext.cartList.length === 0 ?
            <Typography variant="h6" color="primary" >Kundvagnen&nbsp;är&nbsp;tom</Typography> : <>
                <ShoppingCart cartContext={props.cartContext} productContext={props.productContext} />

                {props.userContext.loggedIn ?
                    <Button
                        className={classes.button}

                        onClick={() => props.cartContext.toggleCartVisibility()}
                        component={RouterLink} to={props.userContext.loggedIn ? '/checkout' : ""}
                        variant="contained"
                        color="primary" >
                        gå till kassan
                    </Button>
                    :
                    <LoginModal userContext={props.userContext} />
                }
            </>}
    </div>

    return (
        <div className={classes.relativeContainer}>
            <IconButton
                className={classes.cartIcon}
                // color="secondary"
                onClick={() => props.cartContext.toggleCartVisibility()}>

                {props.cartContext.cartList.length === 0 ?
                    <LocalCafeIcon fontSize="small" color="secondary" /> :
                    <EmojiFoodBeverageIcon fontSize="small" color="secondary" />
                }
            </IconButton>
            {props.cartContext.showCart ? cart : null}
        </div >
    )
}
