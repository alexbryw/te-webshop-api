import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  "palette": {
    "common": {
      "black": "#000",
      "white": "#fff"
    },
    "background": {
      "paper": "#fff",
      "default": "#f5faf6"
    }, "primary": {
      "light": "#2c393f88",
      // "main":"#2c393f",
      "main": "#2c393f",
      "dark": "#102d33",
      "contrastText": "#fff"
    }, "secondary": {
      "light": "#be9c91",
      "main": "#9cba98",
      "dark": "#5f4339",
      "contrastText": "#fff"
    }, "error": {
      "light": "#98ee99",
      "main": "red",
      "dark": "#338a3e",
      "contrastText": "#fff"
    }
    , "text": {
      "primary": "rgba(0, 0, 0, 0.87)",
      "secondary": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.38)",
      "hint": "rgba(0, 0, 0, 0.38)"
    }
  }
})
