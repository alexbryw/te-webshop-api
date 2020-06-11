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
        </CardContent>
      </Link>

      <CardActions disableSpacing>
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
      </CardActions>

    </Card >
  )
}
