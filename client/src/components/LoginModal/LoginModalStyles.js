

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

    background: "#fff",
    boxShadow: "none",
    border: '2px solid #000',
    padding: "1rem 2rem 1.5rem"
  },

  buttonWrapper: {
    '& > *': {
      position: "absolute",
      top: ".5rem",
      zIndex: 1000
    }
  },


  registerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiTypography-overline": {
      fontSize: "0.84rem",
      margin: "0 .5rem"
    },
  },

  btnWrapper: {
    display: "flex",
    justifyContent: "center"
  }
}));

export default useStyles;
