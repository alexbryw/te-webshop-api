import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    inputForUpload: {
        zIndex: 1,
        //display:"none",
        cursor: "pointer",
        opacity: 0.6,
        padding: theme.spacing(16),
        background: "pink",
        marginBottom: "1.5rem"
    },
    buttonForUpload: {
        border: "1rem, solid, #000000",
        marginTop: "2rem",
        margin: "0 0 0em 0",
        position: "relative",
        alignItems: "center"
    },
    divSpace: {
        margin: "0 0 1em 0"
    }
}));

export default useStyles;