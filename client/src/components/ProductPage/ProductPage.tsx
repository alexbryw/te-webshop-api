
import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom"

import useStyles from "./ProductPageStyles"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

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

interface Props extends RouteComponentProps<{ id: string }> {
    productContext: any
    cartContext: any
}

// A simple component that shows the pathname of the current location
const ProductPage = (props: Props) => {
    const classes = useStyles()
    console.log(props.match.params.id);

    const [product, setProduct] = React.useState<any>({
        file: {
            _id: ""
        },
        title: "",
        price: "",
        description: ""
    })

    const getProduct = async () => {
        setProduct(await props.productContext.fetchProduct(props.match.params.id))
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <Grid
            container
            spacing={5}
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.productPageWrapper}
        >
            {console.log(product)}
            {
                product ?
                    <>
                        < Grid item xs={12} sm={6} md={4} >
                            <CardMedia
                                className={classes.media}
                                image={product.file ? "http://localhost:9000/api/files/" + product.file : ""}
                            />
                        </Grid >
                        <Grid item xs={12} sm={6} md={4}>
                            <CardContent>
                                <Typography gutterBottom variant="h3" component="h2">
                                    {product.title}
                                </Typography>
                                <Typography gutterBottom variant="h5" color="textSecondary" component="h2">
                                    {product.price}:-
                    </Typography>
                                <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                                    {product.description}
                                </Typography>

                                <Button variant="contained" color="primary" className={classes.buyBtn}
                                    onClick={() => {
                                        props.cartContext.setCartVisibility(true, false);
                                        // cartState.toggleCartVisibility();
                                        props.cartContext.addProduct(product._id, 1)
                                    }} >
                                    <Typography variant="overline">
                                        köp
                        </Typography>
                                    <ShoppingCartIcon />
                                </Button>
                            </CardContent>
                        </Grid>
                    </> : <h3>nothing here</h3>
            }
        </Grid >
    )
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
export default withRouter(ProductPage);