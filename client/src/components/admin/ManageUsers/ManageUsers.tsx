import React, { useEffect } from "react"

// MATERIAL UI
import { Typography, Grid, Container, IconButton, Button, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'

// ICONS
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// STYLES
import useStyles from "./ManageUsersStyle"


interface Props {
    userContext: any
}

const ManageUsers = (props: Props) => {
    const classes = useStyles()

    const [users, setUsers] = React.useState([])
    const [acceptAdmin, setAcceptAdmin] = React.useState(false)

    const gatherUsers = async () => {
        setUsers(await props.userContext.getUsers())
    }
    useEffect(() => { gatherUsers() }, [])


    return (
        <Container maxWidth="md" className={classes.mainContainer}>
            <Typography variant="h4" className={classes.header}>
                Manage users
            </Typography>

            <List dense className={classes.userList}>
                <ListItem className={classes.user}>
                    <ListItemText primary="name" />
                    <ListItemText primary="role" />
                    <ListItemText primary="ID" />
                    <ListItemText primary="requests admin" />
                </ListItem>
                {users.length === 0 ? (
                    <ListItem className={classes.user}>
                        <Typography variant="h6" className={classes.loading}>
                            Users loading...
                        </Typography>
                    </ListItem>
                )
                    :
                    (
                        users.map((user: any) => (
                            <ListItem className={classes.user} key={user._id}>
                                <ListItemText primary={user.name} />
                                <ListItemText primary={user.admin ? "admin" : "user"} />
                                <ListItemText primary={user._id} />

                                {user.requestsAdmin && !user.admin ?
                                    <ListItem>
                                        <ListItemText primary="Requests&nbsp;admin" />
                                        <IconButton onClick={() => console.log("Accept user :", user.name)}>
                                            <CheckCircleIcon color="primary" />
                                        </IconButton>
                                    </ListItem> : <ListItem></ListItem>
                                }

                            </ListItem>
                        ))
                    )}
            </List>
        </Container >
    )
}

export default ManageUsers
