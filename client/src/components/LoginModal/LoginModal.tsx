import React from 'react';

// MATERIAL UI
import { Grid, Modal, Container, Typography, Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core';

// ICONS
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';

import useStyles from './LoginModalStyles';

type LoginModalView = "login" | "register"

interface Props {
    cancelTimeout: (visibility: Boolean, altVisibility: Boolean | null) => void
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

    const changeView = (newView?: LoginModalView): void => {
        if (newView) setView(newView)
        else setView(view === "login" ? "register" : "login")
    }

    const handleOpen = () => {
        setOpen(true);

        props.cancelTimeout(true, true)
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
                <Typography variant="h4" align="center">{view}</Typography>
            </Grid>
            <Grid item xs={9} justify="center">
                <TextField
                    fullWidth
                    variant="outlined"
                    id="outlined-helperText"
                    label="username"
                    helperText={inputValues.username.length > 20 ? "username can't be longer than 20 characters" : null}

                    value={inputValues.username}
                    onChange={(e) => changeInputValues(e, "username")}
                />
            </Grid>
            <Grid item xs={9}>
                <TextField
                    fullWidth
                    variant="outlined"
                    id="outlined-helperText"
                    label="password"
                    helperText={inputValues.password.length > 20 ? "password can't be longer than 20 characters" : null}

                    value={inputValues.password}
                    onChange={(e) => changeInputValues(e, "password")}
                />
            </Grid>

            {view !== "login" && (
                <>
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            error={inputValues.password !== inputValues.confirmPassword}
                            variant="outlined"
                            id="outlined-helperText"
                            label="confirm password"
                            helperText={"match the password"}

                            value={inputValues.confirmPassword}
                            onChange={(e) => changeInputValues(e, "confirmPassword")}
                        ></TextField>
                    </Grid>


                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox checked={inputValues.requestAdmin} onClick={(e) => changeInputValues(e, "requestAdmin")} name="checkedA" />}
                            label="want to be Admin?"
                        />
                    </Grid>
                </>
            )

            }
            <Grid item xs={12}
                className={classes.registerContainer}>
                <Typography variant="overline">
                    {view === "login" ? "No account yet?" : "Have an account?"}
                </Typography>
                <Button onClick={() => changeView()}>
                    {view === "register" ? "Login" : "Register"}
                </Button>
            </Grid>
        </Grid>
    );

    return (
        <>
            <Button variant="contained"
                color="primary"
                onClick={() => handleOpen()}
                className={classes.button} >
                Logga in & gå till kassan
        </Button>
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