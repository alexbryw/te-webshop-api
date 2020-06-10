import React from 'react'
import { NewCartContext } from '../../contexts/NewCartContext'
import CheckOut from './CheckOut'
import { UserContext } from '../../contexts/UserContext'
import { OrderContext } from '../../contexts/OrderContext'

export default function CheckoutWrapper(){
    return(
        <OrderContext.Consumer>
            {(orderContext: any) =>(
            <UserContext.Consumer>
                {(userContext: any) => (
                    <NewCartContext.Consumer>
                        {(cartState) => <CheckOut cartState={cartState} userContext={userContext} orderContext={orderContext}/>}
                    </NewCartContext.Consumer>
                )}
                </UserContext.Consumer>
            )}
        </OrderContext.Consumer>
    )
}