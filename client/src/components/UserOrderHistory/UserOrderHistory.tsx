import React, { useEffect } from 'react';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog, DialogProps, Button, Typography, ListItem, ListItemText, Grid, List, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

interface Props {
  orderContext: any;
  userContext: any
}
export default function ScrollDialog(props: Props) {

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [orders, setOrders] = React.useState([]);
  const [login, setlogin] = React.useState(true);

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

  //TODO ta in userContexten hit för att ta bort knappen i admin vy 
  //Om du är utloggad eller admin visa inte 👤

  // const userButton: JSX.Element | undefined = login ? (
  //   <Button 
  //     onClick={handleClickOpen('paper')}
  //     style={{ backgroundColor:'transparent'}}><h1>👤</h1>
  //   </Button>
  // ) : undefined

  return (
    <div>

      {/* {userButton} */}
   
      <IconButton 
        color="primary"
        onClick={handleClickOpen('paper')}
        style={{ backgroundColor:'transparent'}}> <PersonIcon/>
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
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
                >
                
                {

                  orders.map((order: any) => {

                    let dateObject: Date = new Date(order.orderDate)
                    // const dateString: string = dateObject.getFullYear() + "/" + dateObject.getMonth() + "/" + dateObject.getDate() 
                    const dateString: string = `${dateObject.getFullYear()}/${dateObject.getMonth()}/${dateObject.getDate()}`  

                    return (
                      <List key={order._id} dense>
                        <ListItem >
                            <ListItemText primary={`${order.to_firstname} ${order.to_lastname}`} />
                        </ListItem>
                        <ListItem >
                            <ListItemText primary={`Ordernummer: ${order._id}`} />
                        </ListItem>
                        <ListItem >
                            <ListItemText style={{color: order.isOrderShipped ? '#558B2F' : '#EB5027'}} primary={`Status: ${order.isOrderShipped ? 'skickat' : 'ej skickat'}`} />
                        </ListItem>
                        <ListItem >
                            <ListItemText primary={`Orderdatum: ${dateString}`} />
                        </ListItem>
                      {
                        order.productRow.map((row: any, index: number) => (
                          row.product != null ?
                            <ListItem key={index}>
                                <ListItem >
                                  <ListItemText primary={`Antal: ${row.qty}`} />
                                </ListItem>

                                <ListItem >
                                  <ListItemText primary={`${row.product.title}`} />
                                </ListItem>

                                <ListItem >
                                  <ListItemText primary={`${row.product.price} :-`} />
                                </ListItem>
                                
                                <ListItem >
                                  <ListItemText primary={`Total: ${row.qty * row.product.price}:-`} />
                              
                                </ListItem>
                            </ListItem> :
                            <ListItem>
                                <ListItemText primary="invalid product" />
                            </ListItem>
                          )
                        )
                      }
                      </List>
                    )
                  })
                }
              
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Klart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}