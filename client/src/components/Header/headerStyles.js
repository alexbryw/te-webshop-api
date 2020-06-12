
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: 0,

        padding: theme.spacing(0, 1),
        position: "relative",
    },

    adminBar: {
        width: "70vw",

        position: "absolute",
        left:"50%",
        transform: "translatex(-50%)",

        zIndex: 900,

        // height: "5rem",
        padding: theme.spacing(1),
        '& .MuiButtonBase-root': {
            padding: theme.spacing(0, 3),
            margin:theme.spacing(1)
        },
        '& .MuiButton-label': {
            border: "none",

        }
    },
    logo: {

        position: "absolute",
        top: "3rem",
        left: "1rem",

        display: "flex",
        alignItems: "center",

        height: "100%",

    },
    logoImg: {
        padding: ".5rem",


        filter: "invert(100%)",
        borderRadius: "50rem",
        background: "#fff5",

        height: "3.5rem",
        transform: "translatey(55%)"
    },

    cartIcon: {
        position: "fixed",
        top: 0,
        zIndex: 1000,
        left: "100%",
        padding: theme.spacing(1),
        transform: "translatex(-100%)"
    },

    button: {
        padding: theme.spacing(1, 2)
    },
}));

export default useStyles;