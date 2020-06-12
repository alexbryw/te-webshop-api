import React, { useEffect } from "react"
import { Grid, Typography, List, ListItem, ListItemText, IconButton } from "@material-ui/core";

// ICONS
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import useStyles from "./ManageOrdersStyles";

interface Props {
    orderContext: any
}

const ManageOrders = (props: Props) => {
    const classes = useStyles()
    const [orders, setOrders] = React.useState([])

    let orderTotal;

    const getOrders = async () => {
        setOrders(await props.orderContext.getOrders())
    }
    const handleConfirmShipping = async (order: any) => {
        setOrders(await props.orderContext.updateOrders(order))
    }

    const getTotal = (order: any): number => {
        let totalPrice: number = 0

        if (order.shipping != null) totalPrice = order.shipping.price

        order.productRow.forEach((product: any) => {
            totalPrice += product.qty * product.product.price
        });

        return totalPrice
    }

    const getDate = (preDate: string) => {
        const formatedDate = preDate.slice(0, 10)
        return formatedDate
    }



    useEffect(() => { getOrders() }, [])

    return (
        <Grid container>
            <Typography variant="h5">
                Hantera beställningar
                </Typography>

            {orders.length === 0 ?
                <Grid container>
                    <Typography variant="h6"> Laddar beställningar </Typography>
                </Grid> :
                orders.map((order: any) => (

                    <Grid container key={order._id} className={classes.product} justify="center">

                        {/* ID */}
                        <Grid item xs={12} className={classes.orderId} direction="column">
                            <Typography variant="overline" align="center">{order._id}</Typography>
                            <Typography variant="overline" align="center">
                                Leverans status: {order.isOrderShipped ? "SKICKAD" : "ej skickad"}
                            </Typography>
                        </Grid>

                        {/* bill to, ship to, shippinginfo */}
                        <Grid item container xs={12} spacing={5} justify="center">
                            <Grid item xs={4}>
                                <List dense className={classes.billingInfo}>
                                    <ListItem >
                                        <ListItemText primary="faktura & leverans adress" color="red" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={order.to_firstname + " " + order.to_lastname} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={order.to_zip + ", " + order.to_street} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={order.to_city} />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={4}>
                                {order.shipping != null ?
                                    <List dense className={classes.shippingInfo}>
                                        <ListItem >
                                            <ListItemText primary="shipping info" color="red" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={order.shipping.companyName} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={"Shipping cost : " + order.shipping.price + ":-"} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={"Delivery placed : " + getDate(order.orderDate)} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={"Delivery time : " + order.shipping.deliveryTime + "day(s)"} />
                                        </ListItem>
                                    </List>
                                    : null}
                            </Grid>

                        </Grid>

                        {order.isOrderShipped ?
                            null :
                            <Grid item xs={12} direction="column" className={classes.shippingBtn}>
                                <Typography variant="overline">
                                    Bekräfta leverans
                                </Typography>

                                <IconButton onClick={() => handleConfirmShipping(order)}>
                                    <CheckCircleIcon />
                                </IconButton>
                            </Grid>
                        }


                        {/* products */}
                        < Grid item xs={12} md={8} >
                            <List className={classes.productList} dense>
                                <ListItem>
                                    <ListItemText primary="antal" />
                                    <ListItemText primary="produkt"/>
                                    <ListItemText primary="styck pris"/>
                                    <ListItemText primary="total"/>
                                </ListItem>
                                {order.productRow.map((row: any, index: number) => (
                                    row.product != null ?
                                        <ListItem key={index}>
                                            <ListItemText primary={row.qty} />
                                            <ListItemText primary={row.product.title} />
                                            <ListItemText primary={row.product.price + ":-"} />
                                            <ListItemText primary={row.qty * row.product.price + ":-"} />
                                        </ListItem> :
                                        <ListItem>
                                            <ListItemText primary="produkten finns ej" />
                                        </ListItem>
                                ))}
                                <ListItem className={classes.totalPrice}>
                                    <ListItemText primary={
                                        order.productRow[0].product != null ? "Att betala : " + getTotal(order) + ":-" : "ingen beställning"} />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid >
                )
                )

            }

        </Grid >
    )
}

export default ManageOrders

