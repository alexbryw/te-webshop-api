import React from 'react';

// MATERIAL UI
import { Grid, Modal, Container, Typography, Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core';



// CONTEXT
import UserContext from "../../contexts/UserContext"

import useStyles from './LoginModalStyles';

type LoginModalView = "login" | "register"

interface Props {
    userContext: any,
}

const LoginModal = (props: Props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [view, setView] = React.useState("login");

    const [inputValues, setInputValues] = React.useState({
        username: "",
        password: "",
        confirmPassword: "",
        requestAdmin: false
    });
    const changeInputValues = (event: any, anchor: string) => {
        clearInputErrors()
        if (anchor === "requestAdmin") {
            setInputValues({
                ...inputValues,
                requestAdmin: !inputValues.requestAdmin
            })
        } else {
            setInputValues({
                ...inputValues,
                [anchor]: event.target.value
            })
        }
    }
    const [inputErrors, setInputErrors] = React.useState({
        login: false,
        register: false,
        user: false
    })
    const handleSetInputErrors = (error: boolean, anchor: string) => {
        setInputErrors({
            ...inputErrors,
            [anchor]: error
        })
    }
    const clearInputErrors = () => {
        setInputErrors({
            login: false,
            register: false,
            user: false,
        });
    };


    const changeView = (newView?: LoginModalView): void => {
        if (newView) setView(newView)
        else setView(view === "login" ? "register" : "login")
    }

    const handleOpen = () => {
        setOpen(true);

        // props.cancelTimeout(true, true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <Grid container
            spacing={2}
            justify="center"
            alignItems="center"
            className={classes.paper}>

            <Grid item xs={6}>
                <Typography variant="h4" align="center">{view === 'login' ? 'Logga in' : 'Registrera dig'}</Typography>
            </Grid>
            <Grid item xs={9}>
                <TextField
                    fullWidth
                    variant="outlined"
                    id="outlined-helperText"
                    label="användarnamn"
                    helperText={inputErrors.register ? "username is unavailable" :
                        inputValues.username.length > 20 ? "Användarnamnet får ej överstiga 20 tecken" : null}

                    value={inputValues.username}
                    onChange={(e) => changeInputValues(e, "username")}
                    error={inputErrors.login || inputErrors.register}
                />
            </Grid>
            <Grid item xs={9}>
                <TextField
                    fullWidth
                    type="password"
                    variant="outlined"
                    id="outlined-helperText"
                    label="lösenord"
                    helperText={inputValues.password.length > 20 ? "Lösenordet får ej överstiga 20 tecken" : null}

                    value={inputErrors.login ? "" : inputValues.password}
                    onChange={(e) => changeInputValues(e, "password")}
                    error={inputErrors.login}
                />
            </Grid>

            {view !== "login" && (
                <>
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            type="password"
                            error={inputValues.password !== inputValues.confirmPassword}
                            variant="outlined"
                            id="outlined-helperText"
                            label="Bekräfta lösenord"
                            helperText={"Lösenordet måste matcha"}

                            value={inputValues.confirmPassword}
                            onChange={(e) => changeInputValues(e, "confirmPassword")}
                        ></TextField>
                    </Grid>


                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox checked={inputValues.requestAdmin} onClick={(e) => changeInputValues(e, "requestAdmin")} name="checkedA" />}
                            label="Ansök om admin roll?"
                        />
                    </Grid>
                </>
            )

            }

            <Grid item xs={12}
                className={classes.btnWrapper}
            >
                {view === "login" ?
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => props.userContext.loginUser(
                            { name: inputValues.username, password: inputValues.password },
                            handleClose,
                            handleSetInputErrors
                        )}>
                        Logga in
                    </Button>
                    :
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={inputValues.password !== inputValues.confirmPassword
                            || inputValues.password.length < 3
                            || inputValues.username.length < 3}
                        onClick={() => props.userContext.registerUser(
                            {
                                name: inputValues.username,
                                password: inputValues.password,
                                requestsAdmin: inputValues.requestAdmin
                            },
                            handleClose,
                            handleSetInputErrors
                        )}
                    >
                        Registrera
                    </Button>
                }
            </Grid>

            <Grid item xs={12}
                className={classes.registerContainer}>
                <Typography variant="overline">
                    {view === "login" ? "Inget konto än?" : "Har du ett konto?"}
                </Typography>
                <Button onClick={() => changeView()}>
                    {view === "register" ? "Logga in" : "Registera dig"}
                </Button>
            </Grid>
        </Grid>
    );

    return (
        <>
            {props.userContext.loggedIn ?
                <Button variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => props.userContext.logOut()}>
                    logga ut
                </Button>
                :
                <Button variant="contained"
                    color="primary"
                    onClick={() => handleOpen()}
                    className={classes.button} >
                    logga in
                </Button>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </>
    );
}

export default LoginModal;