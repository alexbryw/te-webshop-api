import React from 'react'
import { NewCartContext } from '../../contexts/NewCartContext'
import CheckOut from './CheckOut'

export default function CheckoutWrapper(){
    return(
        <NewCartContext.Consumer>
            {(cartState) => <CheckOut cartState={cartState}/>}
        </NewCartContext.Consumer>
    )
}