import React from 'react'

// COMPONENTS
import ManageProducts from './ManageProducts/ManageProducts'
import ManageOrders from './ManageOrders/ManageOrders'
import ManageUsers from './ManageUsers/ManageUsers'
import { Redirect } from 'react-router-dom'
import { ProductContext } from '../../contexts/ProductContext';

interface Props {
    userContext: any
    orderContext: any
    productContext: any
}

const AdminLayout = (props: Props) => {
    return (
        props.userContext.admin ? props.userContext.adminView === "products" ?
            <ManageProducts productContext={props.productContext}/> : props.userContext.adminView === "orders" ?
                <ManageOrders orderContext={props.orderContext} /> : props.userContext.adminView === "users" ?
                    <ManageUsers userContext={props.userContext} /> : null
            : <Redirect to="/" />
    )
}

export default AdminLayout;
