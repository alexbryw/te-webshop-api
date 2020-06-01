
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "4rem",

        padding: theme.spacing(1),
        position: "relative"
    },

    logoImg: {
        height: "3rem",
        padding: ".5rem"
    },
    logoWrapper: {
        height: "100%"
    },
    logoContainer: {
        textDecoration: "none",
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translatex(-50%)"
    },
    cartIcon: {
        position: "fixed",
        top: 0,
        zIndex: 1000,
        left: "100%",
        padding: theme.spacing(1),
        transform: "translatex(-100%)"
    }, button: {
        // margin: theme.spacing(1),
        margin: 0,
        padding: theme.spacing(1, 2)
    },
}));

export default useStyles;