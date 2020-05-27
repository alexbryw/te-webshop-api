import React, { useState, CSSProperties } from 'react'
import { Link as RouterLink } from 'react-router-dom'

// MATERIAL UI
import { IconButton, Button, Typography } from '@material-ui/core'


// ICONS
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

// COMPONENTS
import ShoppingCart from './ShoppingCart'
import LoginModal from "./LoginModal/LoginModal"


import { CartContext } from '../contexts/cartContext'


import { CartItem } from '../typings'

import useMediaQuery from '@material-ui/core/useMediaQuery'


interface Props {
    cartState: any
}

export function CartIcon(props: Props) {
    const [loggedIn, setLoggedIn] = useState(false)

    const [isCartShown, setToggled] = useState(false)
    const handleOnClick = () => setToggled(!isCartShown)

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

    function displayCart() {
        const emptyCart = <Typography variant="h6" color="primary" style={{ margin: '1rem' }}>Kundvagnen är tom</Typography>
        
        const filledCart =
            <>
                <ShoppingCart />
                {loggedIn ?
                    <Button
                        component={RouterLink} to='/checkout'
                        variant="contained"
                        color="primary"
                    >
                        gå till kassan
                                </Button>
                    :
                    <LoginModal />
                }
            </>
        if (props.cartState.showCart) {
            return (
                <div style={clickAwayDiv} onClick={() => props.cartState.toggleCartVisibility()}>
                    <div style={{ ...shoppingCartContainer, ...divSize }}>
                        {props.cartState.cartList.length === 0 ? emptyCart : filledCart}
                    </div>
                </div>
            )
        }
    }

    return (
        <div style={relativeContainer}>
            {/* <div style={{ marginRight: '1rem' }}> */}
            <IconButton
                color="secondary"
                style={{ border: 'solid #9cba98 0.1em' }}
                onClick={() => props.cartState.toggleCartVisibility()}>

                {props.cartState.cartList.length === 0 ?
                    <LocalCafeIcon fontSize="small" color="secondary" /> :
                    <EmojiFoodBeverageIcon fontSize="small" color="secondary" />
                }
            </IconButton>
            {displayCart()}
        </div >
    )
}

const numberOfOrders: CSSProperties = {
    border: '0.1em solid #9cba98',
    height: '1.5em',
    width: '1.5em',
    borderRadius: '2em',
    textAlign: 'center',
    color: '#9cba98',
    position: 'relative',
    backgroundColor: '#346933',
    top: '-1.5em',
}

const relativeContainer: CSSProperties = {
    display: 'flex',
    position: 'relative'
}

const shoppingCartContainer: CSSProperties = {
    position: 'absolute',
    right: 0,
    top: "4rem",
    zIndex: 1000,

    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 0 0.3rem black'
}

const clickAwayDiv: CSSProperties = {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    right: 0,

    width: '100vw',
    height: '100vh',
}