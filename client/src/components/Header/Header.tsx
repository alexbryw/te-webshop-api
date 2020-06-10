import React, { CSSProperties, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// MATERIAL UI
import { Typography, Grid, Container, IconButton, Button } from '@material-ui/core'


import useMediaQuery from '@material-ui/core/useMediaQuery'

// STYLES
import useStyles from "./headerStyles"
import { Cart } from '../Cart'

// COMPONENTS
import LoginModal from "../LoginModal/LoginModal"
import UserOrderHistory from "../UserOrderHistory/UserOrderHistory"

// CONTEXTS
import { NewCartContext } from "../../contexts/NewCartContext"
import { UserContext } from '../../contexts/UserContext'



interface Props {
    orderContext: any;
    userContext:any
  }

export default function Header(props: Props) {
    const classes = useStyles()
    const logo: any = require("../items/images/logo.png")
     

    return (
        <UserContext.Consumer>
            {userContext => (
      
                <NewCartContext.Consumer>
                    {(cartState) => (
                        <>
                            <Grid container
                                direction="row"
                                alignItems="center"
                                className={classes.root}>

                                {userContext.loggedIn ?
                                    <Button variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => userContext.logOut()}
                                    >logga ut </Button>
                                    :
                                    <LoginModal userContext={userContext} buttonHandle="logga in" />}

                                <Link to="/" className={classes.logo}>
                                    <img src={logo} alt="logo" className={classes.logoImg} />
                                </Link>
                                    
                                 
                                      
                                    <UserOrderHistory orderContext={props.orderContext} userContext={props.userContext}/>
                                       
                                   

                                <div className={classes.cartIcon}>
                                    <Cart cartState={cartState} userContext={userContext} />
                                </div>
                            </Grid>

                            {userContext.admin &&
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-evenly"
                                    alignItems="center"
                                    className={classes.adminBar}
                                >
                                    <Grid item>
                                        <Link to="/admin">
                                            <Button variant="outlined" color="secondary" onClick={() => userContext.changeAdminView("products")}>
                                                products
                                        </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/admin">
                                            <Button variant="outlined" color="secondary" onClick={() => userContext.changeAdminView("orders")}>
                                                orders
                                        </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/admin">
                                            <Button variant="outlined" color="secondary" onClick={() => userContext.changeAdminView("users")}>
                                                users
                                        </Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            }
                        </>
                    )}
                </NewCartContext.Consumer>
            )}
          
        </UserContext.Consumer>
    )
}