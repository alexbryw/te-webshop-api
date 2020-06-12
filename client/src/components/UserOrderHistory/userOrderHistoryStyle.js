
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    recipteList: {
        border: '0.1rem solid #2c393f', 
        marginBottom: '0.6rem',
        backgroundColor: '#2c393f35'
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