import React, { CSSProperties, useEffect } from "react";
import { Link } from "react-router-dom";


// MATERIAL UI
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {
  CardContent,
  CardMedia,
  Typography,
  Button,
  Card,
  CardActions,
} from "@material-ui/core/";

// STYLES
import useStyles from "./ProductCartStyles"

interface Props {
  product: any;
  productContext: any;
  cartContext: any
}


export default function ProductCard(props: Props) {
  const classes = useStyles();

  function isProductInStock(){
    let inStock = true
    for (const cartItem of props.cartContext.cartList) {
      if(cartItem.id === props.product._id){
        if(cartItem.nrItems >= props.product.nrInStock){
            inStock = false
        }
      }
    }
    // console.log(inStock, " is OutOfStock card." )
    return inStock
  }

  return (
    <Card className={classes.root}>

      <Link to={"product/" + props.product._id}>
        <CardMedia
          className={classes.media}
          image={"http://localhost:9000/api/files/" + props.product.file}
          title={props.product.title}
        />
        <CardContent>
          <Typography variant="h5" color="textSecondary" className={classes.productTitle}>
            {props.product.title}
          </Typography>
          <Typography variant="h6" color="textSecondary" className={classes.productTitle}>
            Lager: {props.product.nrInStock}
          </Typography>
        </CardContent>
      </Link>

      <CardActions disableSpacing>
        {isProductInStock() && props.product.nrInStock !== 0 ? 
        <Button
          className={classes.buyBtn}
          variant="contained"
          color="primary"
          onClick={() => {
            props.cartContext.setCartVisibility(true, false);
            props.cartContext.addProduct(props.product._id, 1)
          }}>
          <ShoppingCartIcon />&nbsp;{props.product.price}:-
        </Button>
        :
        <Button
        className={classes.buyBtn}
        variant="contained"
        disabled={true}
        color="primary">
        <ShoppingCartIcon />&nbsp; Lager: {props.product.nrInStock}
      </Button>
      }
      </CardActions>

    </Card >
  )
}
