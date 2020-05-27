import React from 'react'
import { CartContext } from '../contexts/cartContext'
import { List, ListItem, ListItemText, IconButton, ListItemAvatar, Avatar, Divider, Typography, Hidden } from '@material-ui/core'
import DeleteRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { Link as RouterLink} from 'react-router-dom'
import { CartItem } from '../typings'

export default function ShoppingCart() {
    return (
        <CartContext.Consumer>
            {(cartState: any) => (
                <div>
                    <List>
                        {cartState.cartList?.length > 0 ? 
                            cartState.cartList.map((cartItem: CartItem) =>
                                <div key={cartItem.id}>
                                    <ListItem >
                                        <Hidden only="xs">
                                        <ListItemAvatar>
                                            <Avatar src={cartItem.product.imgURL}/>
                                        </ListItemAvatar>
                                        </Hidden>
                                        <ListItemText primary={<Typography style = {{textDecoration: 'none', color: 'black', display: 'flex'}} component = {RouterLink} to={"product/"+ cartItem.id} noWrap>{cartItem.product.name}</Typography> } />
                                        <div style={nextFlex}>
                                        <IconButton size="small" onClick ={(e) => {e.stopPropagation(); cartState.addProduct(cartItem.id, -1)}}>
                                            <RemoveIcon fontSize="small"/>
                                        </IconButton>
                                        <ListItemText primary={<Typography noWrap >{cartItem.nrItems}</Typography> } />
                                        <IconButton size="small" onClick={(e) => {e.stopPropagation(); cartState.addProduct(cartItem.id, 1)}}>
                                            <AddIcon fontSize="small"/>
                                        </IconButton>
                                        </div>
                                        <div style={flexStyle}>
                                        <ListItemText primary={
                                            <Typography noWrap align="center">
                                                {cartItem.product.price + " kr"}
                                            </Typography> 
                                            } />
                                        <IconButton size="small" edge="end" aria-label="delete" onClick={(e) => {e.stopPropagation(); cartState.removeItemFromCart(cartItem.id)}}>
                                            <DeleteRoundedIcon fontSize="small"/>
                                        </IconButton>
                                        </div>
                                    </ListItem>
                                <Divider/>
                                </div>
                            )
                            : undefined //show nothing if cart is empty.
                        }
                        <ListItem>
                        <ListItemText primary={
                            <Typography noWrap align="right" variant="h6" color="primary">
                                {"Total: " + cartState.cartTotalPrice + ' kr'}
                            </Typography> 
                        } />
                        </ListItem>
                    </List>
                </div>
            )}
        </CartContext.Consumer>
    )
}

const flexStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "right"
}

const nextFlex: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
}
