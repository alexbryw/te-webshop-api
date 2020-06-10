import React, { CSSProperties, useEffect } from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import PurchaseButtons from "./PurchaseButtons";

// MATERIAL UI
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {
  makeStyles,
  CardContent,
  CardMedia,
  Typography,
  Button
} from "@material-ui/core/";

interface Props {
  product: any;
  productContext: any;
  cartContext: any
}

const useStyles = makeStyles({
  media: {
    height: 200,
  },
  cardTitle: {
    color: "#000",
    textDecoration: "none",
  },
  buyBtn: {
    width: "80%",
    margin: "2rem",
    '& > * > * ': {
      margin: "0 0.2rem"
    }
  },
});

export default function ProductCard(props: Props) {
  const classes = useStyles();

  return (
    <>
      <Link to={"product/" + props.product._id} className={classes.cardTitle}>
        <div>
          <CardMedia
            className={classes.media}
            image={"http://localhost:9000/api/files/" + props.product.file._id}
            title={props.product.title}
          />

          <CardContent>
            <Typography variant="h5" component="h1">
              {props.product.title}
            </Typography>
          </CardContent>
        </div>
      </Link>
      <Button variant="contained" color="primary" className={classes.buyBtn}
        onClick={() => {
          props.cartContext.setCartVisibility(true, false);
          // cartState.toggleCartVisibility();
          props.cartContext.addProduct(props.product._id, 1)
        }} >
        <Typography variant="overline">
          köp
                        </Typography>
        <ShoppingCartIcon />
      </Button>
    </>
  );
}
