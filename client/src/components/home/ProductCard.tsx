import React, { CSSProperties, useEffect } from 'react'
import { Product } from '../items/itemListCore'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import PurchaseButtons from './PurchaseButtons'
import { Link } from 'react-router-dom'


interface Props {
  itemData: Product
}

const useStyles = makeStyles({

  media: {
    height: 200,
  },
  cardTitle: {
    color: '#000',
    textDecoration: 'none'
  }
})

export default function ProductCard(props: Props) {
  const classes = useStyles()

  const[products, setProducts] = React.useState([])
  const fetchProducts = async () => {
      await fetch("http://localhost:9000/api/products/", {
          method: "GET",
          credentials: 'include',
      }).then((response) => response.json()).then((data) => {
          console.log(data);
          setProducts(data)
      })
  } 
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <Link to={"product/" + props.itemData.id} className={classes.cardTitle}>
        <div>
          <CardMedia
            className={classes.media}
            //image={setProducts.}
            title={props.itemData.imgURL + " Image"}
          />
          <CardContent>
            <Typography variant="h5" component="h1">
              {props.itemData.name}
            </Typography>
          </CardContent>
        </div>
      </Link>
      <PurchaseButtons itemPrice={props.itemData.price} itemId={props.itemData.id} />
    </>
  )
}
