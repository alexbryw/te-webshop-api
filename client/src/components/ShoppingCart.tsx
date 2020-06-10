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
    Hidden,
    CardMedia,
} from '@material-ui/core'
import DeleteRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

interface Props {
    cartContext: any
    productContext: any
}

export default function ShoppingCart(props: Props) {

    console.log(props.cartContext);


    return (
        props.cartContext.cartList?.length > 0 ?
            <List>
                {console.log(props.cartContext)}
                {props.cartContext.cartList.map((cartItem: any) =>
                    <div key={cartItem.id}>
                        <ListItem >
                            <ListItemText primary={
                                <Typography style={{ textDecoration: 'none', color: 'black', display: 'flex' }} component={RouterLink} to={"product/" + cartItem.id} noWrap>
                                    {cartItem.product.name}
                                </Typography>} />
                            <ListItemText primary={
                                <Typography style={{ textDecoration: 'none', color: 'black', display: 'flex' }} component={RouterLink} to={"product/" + cartItem.id} noWrap>
                                    {cartItem.product.name}
                                </Typography>} />
                            <div style={nextFlex}>
                                <IconButton size="small" onClick={(e) => { e.stopPropagation(); props.cartContext.addProduct(cartItem.id, -1, null) }}>
                                    <RemoveIcon fontSize="small" />
                                </IconButton>
                                <ListItemText primary={<Typography noWrap >{cartItem.nrItems}</Typography>} />
                                <IconButton size="small" onClick={(e) => { e.stopPropagation(); props.cartContext.addProduct(cartItem.id, 1, props.productContext.fetchProduct) }}>
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
                }
            </List>
            :
            <List>
                <ListItem>
                    <ListItemText primary="Kundvagnen är tom" />
                </ListItem>
            </List>

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
