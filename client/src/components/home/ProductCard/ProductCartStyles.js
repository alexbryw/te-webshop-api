import { makeStyles } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#0000",
        '& *': {
            textDecoration: "none"
        },
        '&.MuiPaper-elevation1': {
            boxShadow: "none !important",
        }
    },
    media: {
        height: 0,
        paddingTop: '100%',


        mixBlendMode: "multiply",
        opacity: ".9"
    },
    productTitle: {
        textAlign: "center",
        borderBottom: ".1rem solid #0001"
    },
    buyBtn: {
        width: "80%",
        margin: "1rem auto",
    },
}))

export default useStyles