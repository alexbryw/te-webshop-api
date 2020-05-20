import React from 'react'
import { CartContext } from '../../contexts/cartContext'
import CheckOut from './CheckOut'

export default function CheckoutWrapper(){
    return(
        <CartContext.Consumer>
            {(cartState) => <CheckOut cartState={cartState}/>}
        </CartContext.Consumer>
    )
}