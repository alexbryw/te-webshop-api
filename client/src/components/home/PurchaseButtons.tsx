import React, { CSSProperties, useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { CartContext } from '../../contexts/cartContext'
import AddedToCart from './../../components/AddedToCart'
import { Cart } from "../Cart/Cart"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
)

interface Props {
  itemPrice: number
  itemId: number
}

export default function PurchaseButtons(props: Props) {
  const classes = useStyles()

  //Adds items to the Cart
  const [isCartShown, setToggled] = useState(false)
  const handleOnClick = () => setToggled(!isCartShown)

  return (
    <CartContext.Consumer>
      {(cartState) => (
        <div className={classes.root} style={{ padding: '0 1em 1em' }}>
          <Button onClick={() => {
                cartState.setCartVisibility(true, false);
                // cartState.toggleCartVisibility();
                cartState.addProduct(props.itemId, 1) }}
            variant="contained"
            color="primary"
            fullWidth={true}
            style={centerButton}
          >
            {props.itemPrice + " kr"}
            <ShoppingCartIcon style={ShoppingCartIconStyle} />
          </Button>
        </div>
      )}
    </CartContext.Consumer>
  )
}

const centerButton: CSSProperties = {
  margin: 'auto',
}

const ShoppingCartIconStyle: CSSProperties = {
  fontSize: 15,
  margin: '0 0 0 0.5em'
}