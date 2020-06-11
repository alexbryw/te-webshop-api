import React from 'react'
import { CartContext } from '../contexts/NewCartContext'
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Typography,
    Hidden
} from '@material-ui/core'

export default function ShoppingCart() {
    return (
        <CartContext.Consumer>
            {(cartState) => (
                <div >
                    <List>
                        {cartState.savedCheckoutCartList?.length > 0 ?
                            cartState.savedCheckoutCartList.map(cartItem =>
                                <div key={cartItem.id}>
                                    <ListItem >
                                        <Hidden only="xs">
                                            <ListItemAvatar>
                                                <Avatar src={cartItem.product.imgURL} />
                                            </ListItemAvatar>
                                        </Hidden>
                                        <ListItemText primary={<Typography noWrap>{cartItem.product.name}</Typography>} />
                                        <div style={flexStyle}>
                                            <ListItemText primary={
                                                <Typography noWrap align="center">
                                                    {cartItem.nrItems + " st  " + cartItem.product.price + " kr"}
                                                </Typography>
                                            } />
                                        </div>
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                            : undefined //show nothing if cart is empty.
                        }
                        <ListItem>
                            <ListItemText primary={
                                <Typography noWrap align="right" variant="h6" color="primary">
                                    {"Totalbelopp: " + cartState.savedCartTotalPrice + "kr"}
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