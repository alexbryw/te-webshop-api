
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    orderWrapper: {
        borderBottom: "1px solid #0001"
    },

    orderId: {
        display: "flex",

        textAlign: "center",


        '& > *': {
            width: "100%",
            padding: 0,
            margin: 0
        },
        '& :first-child': {
            color: "#558b2f",
            background: "#0001",
            fontSize: "1rem",
        },
        '& :last-child': {
            color: "#552f8b",

            fontSize: ".6rem",
        }
    },


    productList: {
        '&.MuiList-root': {
            padding: 0,
            margin: ".5rem 0"
        },

        '& > *': {
            textAlign: "right",
            width: "100%",

            '& > *:nth-child(n)': {
                paddingRight: ".5rem",
                borderRight: ".1rem solid #0002"
            },

            '& > *:nth-child(1)': {
                width: "calc((100% / 12))",
            },
            '& > *:nth-child(2)': {
                width: "calc(5 * (100% / 12))",
                borderRight: ".1rem solid #0002"
            },
            '& > *:nth-child(3)': {
                width: "calc(3 * (100% / 12))",
                borderRight: ".1rem solid #0002"
            },
            '& > *:nth-child(4)': {
                width: "calc(3 * (100% / 12))",
            },
        },
        '& .MuiListItem-root:first-child': {
            background: "#a2d293",
        }
    },


    shippingBtn: {
        margin: "0 5rem",
        padding: "1rem",
        textAlign: "center",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",



    },

    product: {
        position: "relative",

        background: "#0001",

        marginBottom: theme.spacing(5),
        paddingBottom: theme.spacing(5),

        borderBottom: ".1rem solid #0001",
        borderRadius: "1rem",

        overflow: "hidden"
    },

    billingInfo: {
        '& > *:first-child': {
            color: "#222",

            borderBottom: "1px solid #222",
            marginBottom: ".5rem"
        },
        '& .MuiListItem-root': {
            textAlign: "right"
        }
    },
    shippingInfo: {
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
