
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "calc(100vh - 12.5rem)",

        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

export default useStyles;
