import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        padding: theme.spacing(1, 4),
        position: "relative",
    },

    categoriesBar: {
        width: "100vw",

        borderBottom: ".1rem solid #0002",

        height: "4rem",
        padding: theme.spacing(1),
        '& .MuiButtonBase-root': {
            padding: theme.spacing(0, 3),
        },
        '& .MuiButton-label': {
            border: "none",

        }
    },

    productContainer: {
        paddingTop: "2rem"
    }
}));

export default useStyles;