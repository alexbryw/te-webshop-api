import React, { useEffect } from "react"

// MATERIAL UI
import { Typography, Container, IconButton, List, ListItem, ListItemText } from '@material-ui/core'

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

    const gatherUsers = async () => {
        const x = await props.userContext.getUsers()

        if (!x.err) {
            setUsers(x)
        }

    }
    useEffect(() => { gatherUsers() }, [])

    const handleUpdateUserStatus = async (user: any) => {
        const x = await props.userContext.updateUserStatus(user)

        if (!x.err) {
            setUsers(x)
        }
    }


    return (
        <Container maxWidth="md" className={classes.mainContainer}>
            <Typography variant="h4" className={classes.header}>
                Hantera användare
            </Typography>

            <List dense className={classes.userList}>
                <ListItem className={classes.user}>
                    <ListItemText primary="Namn" />
                    <ListItemText primary="Roll" />
                    <ListItemText primary="ID" />
                    <ListItemText primary="Admin ansökan" />
                </ListItem>
                {users.length === 0 ? (
                    <ListItem className={classes.user}>
                        <ListItemText primary="Laddar användare..." />
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
                                        <ListItemText primary="Admin&nbsp;ansökan" />
                                        <IconButton onClick={() => handleUpdateUserStatus(user)}>
                                            <CheckCircleIcon color="primary" />
                                        </IconButton>
                                    </ListItem>
                                    :
                                    <ListItemText></ListItemText>
                                }

                            </ListItem>
                        ))
                    )}
            </List>
        </Container >
    )
}

export default ManageUsers
