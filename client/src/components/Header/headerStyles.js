
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        padding: theme.spacing(1, 4),
        position: "relative",
    },

    adminBar: {
        width: "100vw",

        borderTop: ".1rem solid #0002",

        height: "3rem",
        padding: theme.spacing(1),
        '& .MuiButtonBase-root': {
            padding: theme.spacing(0, 3),
        },
        '& .MuiButton-label': {
            border: "none",

        }
    },
    logo: {
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translatex(-50%)",
        
        display: "flex",
        alignItems: "center",

        height: "100%",
    },
    logoImg: {
        height: "2.8rem"
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