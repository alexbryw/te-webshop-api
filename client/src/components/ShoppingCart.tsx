import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    ListItemAvatar,
    Avatar,
    Divider,
    Typography,
    Hidden
} from '@material-ui/core'
import DeleteRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

interface Props {
    cartContext: any
}

export default function ShoppingCart(props: Props) {
    return (
        <div>
            <List>
                {props.cartContext.cartList?.length > 0 ?
                    props.cartContext.cartList.map((cartItem: any) =>
                        <div key={cartItem.id}>
                            <ListItem >
                                <Hidden only="xs">
                                    <ListItemAvatar>
                                        <Avatar src={cartItem.product.imgURL} />
                                    </ListItemAvatar>
                                </Hidden>
                                <ListItemText primary={<Typography style={{ textDecoration: 'none', color: 'black', display: 'flex' }} component={RouterLink} to={"product/" + cartItem.id} noWrap>{cartItem.product.name}</Typography>} />
                                <div style={nextFlex}>
                                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); props.cartContext.addProduct(cartItem.id, -1) }}>
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>
                                    <ListItemText primary={<Typography noWrap >{cartItem.nrItems}</Typography>} />
                                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); props.cartContext.addProduct(cartItem.id, 1) }}>
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </div>
                                <div style={flexStyle}>
                                    <ListItemText primary={
                                        <Typography noWrap align="center">
                                            {cartItem.product.price + " kr"}
                                        </Typography>
                                    } />
                                    <IconButton size="small" edge="end" aria-label="delete" onClick={(e) => { e.stopPropagation(); props.cartContext.removeItemFromCart(cartItem.id) }}>
                                        <DeleteRoundedIcon fontSize="small" />
                                    </IconButton>
                                </div>
                            </ListItem>
                            <Divider />
                        </div>
                    )
                    : undefined //show nothing if cart is empty.
                }
                <ListItem>
                    <ListItemText primary={props.cartContext.cartList?.length === 0 ?
                        <Typography noWrap align="right" variant="h6" color="primary">
                            kundvagnen är tom
                        </Typography>
                        :
                        <Typography noWrap align="right" variant="h6" color="primary">
                            {"Total: " + props.cartContext.cartTotalPrice + ' kr'}
                        </Typography>
                    } />
                </ListItem>
            </List>
        </div>

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
