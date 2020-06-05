
import {
    makeStyles
} from '@material-ui/core/'

const useStyles = makeStyles({
    media: {
        height: '50vh',
    },
    buyBtn: {
        width: "80%",
        margin: "2rem",
        '& > * > * ': {
            margin: "0 0.2rem"
        }
    },
    productPageWrapper: {
        minHeight: "calc(100vh - 13rem)"
    }
})

export default useStyles