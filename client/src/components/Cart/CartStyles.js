import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    cart: {
        position: "absolute",
        right: 0,
        top: "110%",
        zIndex:2000,

        padding: ".5rem",

        background: "#eaeaea",
        borderRadius: ".2rem",
        [theme.breakpoints.down(510)]: {
            maxWidth: "85vw"
        }
    },
    cartIcon: {
        background: "#2c393f88",
        transition: ".22s ease-in-out",
        '& path': {
            color: "#fff"
        },
        '&:hover': {
            background: "#2c393f"
        }
    },
    relativeContainer: {
        width: "100%",

        position: 'relative'
    },
    button: {
        position: "absolute",

        top: ".5rem",
        // top: 0,
        zIndex: 1000,

        padding: theme.spacing(1, 2)
    },
}));

export default useStyles;
