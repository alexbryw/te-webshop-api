import React, { CSSProperties, useState } from 'react'

//COMPONENTS
import AddedToCart from './../AddedToCart'

// MATERIAL UI
import { Button, CardActions } from '@material-ui/core/'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'


// INTERFACES
import { Product } from '../../interfaces/interfaces'

// CONTEXT
import { CartContext } from '../../contexts/cartContext'


interface Props {
    itemData: Product
}

export default function PurchasingArea(props: Props) {
    const handleOnClick = (toggleCart: () => void) => toggleCart()



    return (
        <CartContext.Consumer>
            {(cartState => (
                <>
                    <CardActions>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => { handleOnClick(cartState.toggleCartVisibility); cartState.addProduct(props.itemData?.id, 1) }}
                        >
                            Köp
                    <ShoppingCartIcon />
                        </Button>
                    </CardActions>
                </>
            ))}
        </CartContext.Consumer>


    )
}

