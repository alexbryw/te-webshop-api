
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    recipteList: {
        border: '0.1rem dashed #558B2F', 
        marginBottom: '0.6rem'
    },
    flex: {
        display: "flex"
    },
    openModalBtn: {
        position:"absolute",
        top:"4rem",
        zIndex:1000,

        fontSize:"1rem"
    }
}));

export default useStyles;