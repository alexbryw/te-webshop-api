import React from 'react'

// COMPONENTS
import ManageProducts from './ManageProducts/ManageProducts'
import ManageOrders from './ManageOrders/ManageOrders'
import ManageUsers from './ManageUsers/ManageUsers'
import { Redirect } from 'react-router-dom'

interface Props { userContext: any }

const AdminLayout = (props: Props) => {
    return (
        props.userContext.admin ? props.userContext.adminView === "products" ?
            <ManageProducts /> : props.userContext.adminView === "orders" ?
                <ManageOrders /> : props.userContext.adminView === "users" ?
                    <ManageUsers userContext={props.userContext} /> : null
            : <Redirect to="/" />
    )
}

export default AdminLayout;
