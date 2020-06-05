import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        height: "calc(100vh - 17rem)",

        "& .MuiList-padding": {
            padding: 0,
        },
    },

    header: {
        padding: theme.spacing(1),
        color: theme.palette.primary,
    },
    userList: {
        width: "100%",
        background: "#0004",

        borderRadius: theme.shape.borderRadius,
    },
    user: {
        position: "relative",
        width: "100%",

        "& .MuiIconButton-root": {
            padding: "0 0 0 12px"
        },

        "& .MuiListItemText-root": {
            flex: "0 1 auto",
        },

        "& > *:not(.MuiListItemIcon-root)": {
            padding: theme.spacing(1),
        },
        "& > *:nth-child(1)": {
            width: "calc(100% / 5)",
            [theme.breakpoints.down(500)]: {
                width: "calc(100% / 3)",
            },
        },
        "& > *:nth-child(2)": {
            width: "calc(100% / 5)",
            [theme.breakpoints.down(500)]: {
                width: "calc(100% / 3)",
            },
        },
        "& > *:nth-child(3)": {
            width: "calc(2*(100% / 5))",
            [theme.breakpoints.down(500)]: {
                display: "none",
            },
        },
        "& > *:nth-child(4)": {
            width: "calc(2*(100% / 5))",
            display: "flex",
            justifyContent: "flex-end",


            [theme.breakpoints.down(500)]: {
                width: "calc(100% / 3)",
            },

            '& > *': {
            }

        },
        "&:nth-child(2n)": {
            background: "#fff8",
        },
        "&:nth-child(2n -1)": {
            background: "#fff5",
        },
        "&:first-child": {
            background: "#558b2f",
            color: "#e7e7e7",
            textDecoration: "underline",
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
        },
    },
    editBtn: {
        position: "absolute",
        right: 0,
    },
    loading: {
        textAlign: "center",
        color: "#0005",
    },
}));

export default useStyles;
