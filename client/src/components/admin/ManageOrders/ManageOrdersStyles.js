
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    orderWrapper: {
        border: "1px solid #ddd"
    },
    orderId: {
        background: "#0002",
        color: "#558b2f",

        textAlign: "center",
    },
    productList: {
        '& > *': {
            textAlign: "right",
            width: "100%",
            '& > *:nth-child(1)': {
                width: "calc((100% / 12))",
            },
            '& > *:nth-child(2)': {
                width: "calc(5 * (100% / 12))",
            },
            '& > *:nth-child(3)': {
                width: "calc(3 * (100% / 12))",
            },
            '& > *:nth-child(4)': {
                width: "calc(3 * (100% / 12))",
            },
        },
        '&:first-child': {

        }
    },
    product: {
        margin: theme.spacing(1),

        border: ".1rem solid #0002",
        borderRadius: ".2rem"
    },

    billingInfo: {
        '& > *:first-child': {
            color: "#222",

            borderBottom: "1px solid #222",
            marginBottom: ".5rem"
        }
    },
    totalPrice: {
        marginLeft: "auto",
        background: "#0002",
        textAlign: "right"
    }
}));

export default useStyles;
