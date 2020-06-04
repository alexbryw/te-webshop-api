import React, { useEffect } from "react"
import { Grid, Typography, List, ListItem, ListItemText } from "@material-ui/core";
import useStyles from "./ManageOrdersStyles";

const ManageOrders = () => {
    const classes = useStyles()

    const [orders, setOrders] = React.useState([])

    let orderTotal;

    const fetchOrders = async () => {
        await fetch("http://localhost:9000/api/orders/", {
            method: "GET",
            credentials: 'include',
        }).then((response) => response.json()).then((data) => {
            console.log(data);
            setOrders(data)
        })
    }

    const getTotal = (order: any): number => {
        let totalPrice: number = 0
        if (order.shipping != null) totalPrice = order.shipping.price

        order.productRow.forEach((product: any) => {
            totalPrice += product.qty * product.product.price
        });


        return totalPrice
    }

    useEffect(() => { fetchOrders() }, [])

    return (
        <Grid container>
            <Typography variant="h5">
                Manage orders
                </Typography>

            {orders.length != 0 ? orders.map((order: any) => (
                <Grid container xs={12} key={order._id} className={classes.product} justify="center">

                    {/* ID */}
                    <Grid item xs={12} className={classes.orderId}>
                        <Typography variant="overline" align="center">{order._id}</Typography>
                    </Grid>

                    {/* bill to, ship to, shippinginfo */}
                    <Grid item container xs={12} justify="center">
                        <Grid item xs={4}>
                            <List dense className={classes.billingInfo}>
                                <ListItem >
                                    <ListItemText primary="bill & ship to" color="red" />
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
                            <List dense className={classes.billingInfo}>
                                <ListItem >
                                    <ListItemText primary="shipping info" color="red" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={order.shipping != null ? order.shipping.companyName : "company name"} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={order.shipping != null ? order.shipping.deliveryTime : "delivery time"} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={order.shipping != null ? order.shipping.price : "price"} />
                                </ListItem>
                            </List>
                        </Grid>

                    </Grid>

                    {/* products */}
                    <Grid item xs={12} md={8}>
                        <List className={classes.productList} dense>
                            <ListItem>
                                <ListItemText primary="qty" />
                                <ListItemText primary="title" secondary="description" />
                                <ListItemText primary="price" secondary="per uni" />
                                <ListItemText primary="price" secondary="total" />
                            </ListItem>
                            {order.productRow.map((row: any) => (
                                <ListItem>
                                    <ListItemText primary={row.qty} />
                                    <ListItemText primary={row.product.title} />
                                    <ListItemText primary={row.product.price + ":-"} />
                                    <ListItemText primary={row.qty * row.product.price + ":-"} />
                                </ListItem>
                            ))}
                            <ListItem className={classes.totalPrice}>
                                <ListItemText primary={"total : " + getTotal(order) + ":-"} />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            )
            )
                :
                <Grid container className={classes.product}>
                    <Typography variant="h4"> loading orders </Typography>
                </Grid>

            }

            }


        </Grid >
    )
}

export default ManageOrders

