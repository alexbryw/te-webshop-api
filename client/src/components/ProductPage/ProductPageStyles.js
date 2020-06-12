
import {
    makeStyles
} from '@material-ui/core/'

const useStyles = makeStyles({
    media: {
        width: "100%",
        mixBlendMode: "multiply",
        opacity: ".9",

        "&:after": {
            content: "open-quote",
            display: "block",
            paddingBottom: "100%",
        }
    },
    buyBtn: {
        width: "80%",
        margin: "2rem",
        '& > * > * ': {
            margin: "0 0.2rem"
        }
    },
    productPageWrapper: {
        padding: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default useStyles