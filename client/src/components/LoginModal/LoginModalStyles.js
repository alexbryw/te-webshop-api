

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: "50%",
    left: "50%",
    zIndex: "1500",

    transform: "translatex(-50%) translatey(-50%)",

    width: "100%",
    maxWidth: "33rem",

    backgroundColor: theme.palette.background.paper,
    boxShadow: "none",
    border: '2px solid #000',
    padding: theme.spacing(2, 4, 3),
  },

  button: {
    position: "absolute",
    
    top: ".5rem",
    // top: 0,
    zIndex: 1000,

    padding: theme.spacing(1, 2)
  },


  registerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiTypography-overline": {
      fontSize: "0.84rem",
      margin: theme.spacing(0, 1),
    },
  },

  btnWrapper: {
    display: "flex",
    justifyContent: "center"
  }
}));

export default useStyles;
