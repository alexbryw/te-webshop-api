import React from 'react'
import { Product } from '../../interfaces/interfaces'

import {
    makeStyles,
    Card,
    CardMedia,
    Typography,
    CardContent,
    Grid,
    IconButton,
    Button
} from '@material-ui/core/'


import { RouteMatch } from "../../interfaces/interfaces"
import { CartContext } from '../../contexts/cartContext'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { withRouter } from 'react-router-dom'



interface Props {
    match: RouteMatch
    productContext: any
}

const useStyles = makeStyles({
    media: {
        height: '50vh',
    },
    buyBtn: {
        width: "80%",
        margin: "2rem",
        '& > * > * ': {
            margin: "0 0.2rem"
        }
    },
    productPageWrapper: {
        minHeight: "calc(100vh - 13rem)"
    }
})

function ProductPage(props: Props) {
    const classes = useStyles()

    console.log(props);
    

    return (
        <CartContext.Consumer>
            {(cartState => (
                <div className={classes.productPageWrapper}>
                    <Grid
                        container
                        spacing={5}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={6} md={4}>
                            <CardMedia
                                className={classes.media}
                                // image={props.itemData?.imgURL}
                                // title={props.itemData?.name + " image"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <CardContent>
                                <Typography gutterBottom variant="h3" component="h2">
                                    {/* {props.itemData?.name} */}
                                </Typography>
                                <Typography gutterBottom variant="h5" color="textSecondary" component="h2">
                                    {/* {props.itemData?.price + ' kr'} */}
                                </Typography>
                                <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                                    {/* {props.itemData?.description} */}
                                </Typography>

                                <Button variant="contained" color="primary" className={classes.buyBtn}
                                    onClick={() => {
                                        cartState.setCartVisibility(true, false);
                                        // cartState.toggleCartVisibility();
                                        // cartState.addProduct(props.itemData?.id, 1)
                                    }} >
                                    <Typography variant="overline">
                                        köp
                                        </Typography>
                                    <ShoppingCartIcon />
                                </Button>
                            </CardContent>
                        </Grid>
                    </Grid>

                </div>
            ))}
        </CartContext.Consumer>
    )
}

export default withRouter(ProductPage)