//Context keeps track of the cart list and handles add/remove items from the list.
//The state content is provided to the rest of the app to consume with <CartContext.Consumer>.

import React from 'react'
import { CartItem } from '../typings'
import { items } from '../ItemList'

export const CartContext = React.createContext<State>({
    cartList: [{id:1, nrItems:1, product:{name:"placeholder", id:0 , price:0, description:"",imgURL:""}}],
    addProduct: () => {},
    removeItemFromCart: () => {},
    cartTotalPrice: 0,
    savedCheckoutCartList: [{id:1, nrItems:1, product:{name:"placeholder", id:0 , price:0, description:"",imgURL:""}}],
    savedCartTotalPrice: 0,
    emptyCart: () => {},
})

interface Props{}
export interface State{
    cartList: Array<CartItem>
    addProduct:(inItemId: number, inNrItems: number) => void
    removeItemFromCart:(inItemId: number) => void
    cartTotalPrice: number
    savedCheckoutCartList: Array<CartItem>  //saved cartList for checkout after cartList is removed after purchase.
    savedCartTotalPrice: number
    emptyCart: () => void
}

export class CartProvider extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
        this.state = {
            cartList: [],
            addProduct: this.addProduct,
            removeItemFromCart: this.removeItemFromCart,
            cartTotalPrice: 0,
            savedCheckoutCartList:[],
            savedCartTotalPrice: 0,
            emptyCart: this.emptyCart,
        }
    }

    // Add a product to cartList array, Id and Number of items to add.
    // Number of items can be negative -1 to remove a product or positive to add.
    addProduct = (inItemId: number, inNrItems: number) => {
        const cartListPosition = this.findItemInCart(inItemId)
        const updatedCartList = [...this.state.cartList]
        
        if(cartListPosition !== false){ //If item is already in cartList just update the number of items.
            updatedCartList[cartListPosition].nrItems = updatedCartList[cartListPosition].nrItems + inNrItems
            if(updatedCartList[cartListPosition].nrItems < 1){  //If count is zero or less, remove it from list.
                this.removeItemFromCart(inItemId)
            } else {
                this.setState({
                    cartList: [...updatedCartList],
                    cartTotalPrice: this.calcTotalCartPrice(updatedCartList),
                    savedCheckoutCartList: [...updatedCartList],
                    savedCartTotalPrice: this.calcTotalCartPrice(updatedCartList),
                })
            }
        } else {    //If item is not in list then a new item is pushed to list.
            if(inNrItems > 0){
                const product = items.find(({id}) => id === inItemId)
                if(product){
                    updatedCartList.push({id: inItemId, nrItems: inNrItems, product:product})
                }

                this.setState({
                    cartList: [...updatedCartList],
                    cartTotalPrice: this.calcTotalCartPrice(updatedCartList),
                    savedCheckoutCartList: [...updatedCartList],
                    savedCartTotalPrice: this.calcTotalCartPrice(updatedCartList),
                })
            }
        }
    }

    calcTotalCartPrice(cartList: Array<CartItem>){
        let TotalPrice = 0
        for (const item of cartList) {
            TotalPrice += item.nrItems * item.product.price
        }
        return TotalPrice
    }

    //Because itemId and cartList array position are different this function 
    //returns the item cartList array position given an itemId.
    findItemInCart = (InItemId: number) => {
        let itemFound = false
        let cartListPosition = 0
        for (let i = 0; i < this.state.cartList.length; i++) {
            const item = this.state.cartList[i];
            if(item.id === InItemId){
                itemFound = true
                cartListPosition = i
            }
        }

        if(itemFound){
            return cartListPosition
        } else {
            return false
        }

    }

    removeItemFromCart = (InItemId:number) => {
        const cartListPosition = this.findItemInCart(InItemId)
        let updatedCartList = [...this.state.cartList]
        if(cartListPosition !== false){
            updatedCartList.splice(cartListPosition,1)
            this.setState({
                cartList: [...updatedCartList],
                cartTotalPrice: this.calcTotalCartPrice(updatedCartList),
                savedCheckoutCartList: [...updatedCartList],
                savedCartTotalPrice: this.calcTotalCartPrice(updatedCartList),
            })
        }
    }

    //Empty cart after purchase.
    emptyCart = () => {
        this.setState({
            cartList: [],
            cartTotalPrice: 0,
        })
    }

    render(){
        return(
            <CartContext.Provider value={this.state}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}