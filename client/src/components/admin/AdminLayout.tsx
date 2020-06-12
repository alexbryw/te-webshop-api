import React from 'react'

// COMPONENTS
import ManageProducts from './ManageProducts/ManageProducts'
import ManageOrders from './ManageOrders/ManageOrders'
import ManageUsers from './ManageUsers/ManageUsers'
import { Redirect } from 'react-router-dom'


import useStyles from "./AdminLayoutstyles"

interface Props {
    userContext: any
    orderContext: any
    productContext: any
}

const AdminLayout = (props: Props) => {


    const classes = useStyles()

    return (
        <div className={classes.root}>

            {props.userContext.admin ? props.userContext.adminView === "products" ?
                <ManageProducts productContext={props.productContext} /> : props.userContext.adminView === "orders" ?
                    <ManageOrders orderContext={props.orderContext} /> : props.userContext.adminView === "users" ?
                        <ManageUsers userContext={props.userContext} /> : null
                : <Redirect to="/" />}
        </div>
    )
}

export default AdminLayout;
