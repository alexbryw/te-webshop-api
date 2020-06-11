import React, { useEffect } from 'react';
//Material UI
import { DialogActions, DialogContent, DialogTitle, Dialog, DialogProps, Button, ListItem, ListItemText, List, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

// STYLES
import useStyles from "./userOrderHistoryStyle"

interface Props {
  orderContext: any;
  userContext: any
}
export default function ScrollDialog(props: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [orders, setOrders] = React.useState([]);

  const getOrders = async () => {
    setOrders(await props.orderContext.getOrders())
  }


  console.log(orders)

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  useEffect(() => {
    getOrders()
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const getOrderDate = (orderDate: string) => {
    let dateObject: Date = new Date(orderDate)
    const dateString: string = `${dateObject.getFullYear()}/${dateObject.getMonth()}/${dateObject.getDate()}`
    return dateString
  }

  return (
    <>
      <IconButton
        color="primary"
        size="medium"
        onClick={handleClickOpen('paper')}
      >
        <PersonIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Köphistorik</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          {orders ?
            orders.map((order: any) => (
              <List key={order._id} dense>
                <ListItem >
                  <ListItemText primary={`${order.to_firstname} ${order.to_lastname}`} />
                </ListItem>
                <ListItem >
                  <ListItemText style={{ color: order.isOrderShipped ? '#558B2F' : '#BF9900' }} primary={`Orderstatus: ${order.isOrderShipped ? 'Skickad ✅' : 'Packas 📦'}`} />
                </ListItem>
                <ListItem >
                  <ListItemText primary={`Orderdatum: ${getOrderDate(order.orderDate)}`} />
                </ListItem>
                <ListItem >
                  <ListItemText primary={`Ordernummer: ${order._id}`} />
                </ListItem>

                {
                  order.productRow.map((row: any, index: number) => (row.product != null ?
                    <List className={classes.recipteList} key={index} dense>
                      <ListItem >
                        <ListItemText primary={`${row.product.title}`} />
                      </ListItem>


                      <div className={classes.flex}>
                        <ListItem>
                          <ListItemText primary={`Antal: ${row.qty}`} />
                        </ListItem>

                        <ListItem>
                          <ListItemText primary={`Pris: ${row.product.price} :-`} />
                        </ListItem>

                        <ListItem>
                          <ListItemText primary={`Total: ${row.qty * row.product.price}:-`} />
                        </ListItem>
                      </div>

                    </List> :
                    <ListItem>
                      <ListItemText primary="invalid product" />
                    </ListItem>
                  )
                  )
                }
              </List>
            )
            )
            : null}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined" size="small">
            Klart
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}