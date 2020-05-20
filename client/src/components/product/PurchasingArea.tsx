import React,{ CSSProperties, useState } from 'react'
import { Product } from '../items/itemListCore'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { CartContext } from '../../contexts/cartContext'
import AddedToCart from './../AddedToCart'


interface Props{
    itemData: Product
}

export default function PurchasingArea( props: Props ){
    const [isCartShown, setToggled] = useState(false)
    const handleOnClick = () => setToggled(!isCartShown)

    //Displays cart
    function displayCart(){
        if(isCartShown){
            return <AddedToCart handleClosing = {handleOnClick}/>
        }
    }


    return(
        <CartContext.Consumer>
            {(cartState => (
            <div>
                {displayCart()}
                <CardActions>
                    <Button 
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {handleOnClick();cartState.addProduct(props.itemData?.id, 1)}}
                    >
                    Köp
                    <ShoppingCartIcon
                        style={ShoppingCartIconStyle}/>
                    </Button>
                </CardActions>
            </div>
            ))}
        </CartContext.Consumer>


    )
}

const ShoppingCartIconStyle:CSSProperties={
    fontSize: 15,
    margin: '0 0 0 0.5em' 
}