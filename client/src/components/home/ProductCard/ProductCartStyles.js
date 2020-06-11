import { makeStyles } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
    root: {
        // background: "#a2d293",
        '& *': {
            textDecoration: "none"
        },
        '&.MuiPaper-elevation1': {
            boxShadow: "none !important",
            border: ".1rem solid #a2d29344",
        }
    },
    media: {
        height: 0,
        // paddingTop: '56.25%', // 16:9
        paddingTop: '90%',

        // filter: " grayscale(100%)"
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