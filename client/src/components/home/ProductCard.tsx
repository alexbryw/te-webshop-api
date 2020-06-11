import React, { CSSProperties, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from 'clsx';

// COMPONENTS
import PurchaseButtons from "./PurchaseButtons";

// MATERIAL UI
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  makeStyles,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardActions,
  Collapse,
  Theme,
  createStyles
} from "@material-ui/core/";

interface Props {
  product: any;
  productContext: any;
  cartContext: any
}

// const useStyles = makeStyles({
//   media: {
//     height: 200,
//   },
//   cardTitle: {
//     color: "#000",
//     textDecoration: "none",
//   },
//   buyBtn: {
//     width: "80%",
//     margin: "2rem",
//     '& > * > * ': {
//       margin: "0 0.2rem"
//     }
//   },
// });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      // paddingTop: '56.25%', // 16:9
      paddingTop: '75%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: "red",
    },
  }),
);

export default function ProductCard(props: Props) {
  const classes = useStyles();

  // return (
  //   <>
  //     <Link to={"product/" + props.product._id} className={classes.cardTitle}>
  //       <Card>
  //         <CardMedia
  //           className={classes.media}
  //           image={"http://localhost:9000/api/files/" + props.product.file._id}
  //           title={props.product.title}
  //         />

  //         <CardContent>
  //           <Typography variant="h5" component="h1">
  //             {props.product.title}
  //           </Typography>
  //         </CardContent>
  //       </Card>
  //     </Link>
  //     <Button variant="contained" color="primary" className={classes.buyBtn}
  //       onClick={() => {
  //         props.cartContext.setCartVisibility(true, false);
  //         props.cartContext.addProduct(props.product._id, 1)
  //       }} >
  //       <Typography variant="overline">
  //         {props.product.price}:- köp
  //       </Typography>
  //       <ShoppingCartIcon />
  //     </Button>
  //   </>
  // );

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.product.title}
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image={"http://localhost:9000/api/files/" + props.product.file._id}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <Typography variant="overline">
          {props.product.price}:- köp
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={() => {
            props.cartContext.setCartVisibility(true, false);
            props.cartContext.addProduct(props.product._id, 1)
          }}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>


    </Card>
  )
}
