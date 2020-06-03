import React, { CSSProperties, useEffect } from "react";
import { Product } from "../items/itemListCore";
import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core/";

import PurchaseButtons from "./PurchaseButtons";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
  productContext: any;
}

const useStyles = makeStyles({
  media: {
    height: 200,
  },
  cardTitle: {
    color: "#000",
    textDecoration: "none",
  },
});

export default function ProductCard(props: Props) {
  const classes = useStyles();

  return (
    <>
      <Link to={"product/" + props.product.id} className={classes.cardTitle}>
        <div>
          <CardMedia
            className={classes.media}
            image={props.product.imgURL}
            title={props.product.imgURL + " Image"}
          />
          <CardContent>
            <Typography variant="h5" component="h1">
              {props.product.name}
            </Typography>
          </CardContent>
        </div>
      </Link>
      <PurchaseButtons
        itemPrice={props.product.price}
        itemId={props.product.id}
      />
    </>
  );
}
