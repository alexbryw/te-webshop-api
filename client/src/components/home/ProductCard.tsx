import React, { CSSProperties, useEffect } from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import PurchaseButtons from "./PurchaseButtons";

// MATERIAL UI
import {
  makeStyles,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core/";

interface Props {
  product: any;
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
      <PurchaseButtons
        itemPrice={props.product.price}
        itemId={props.product.id}
      />
    </>
  );
}
