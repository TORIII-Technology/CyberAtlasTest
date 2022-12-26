import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import grey from "@mui/material/colors/grey"
import "@fontsource/noto-sans-tc"
import 'fonts/quinquefive/QuinqueFive.ttf'


const theme = createTheme({
  palette: {
    mode: "dark",
    main: {
      text: grey[100],
      background: "black",
      divider: grey[700],
    },
    interact: {
      active: "white",
      unActive: grey[700],
      hover: "#FFF315",
    },
    background: {
      default: "black",
      paper: "black",
    },
  },

  typography: {
    fontFamily: '"Noto Sans TC", sans-serif',
    body12: {
      fontSize: "12px",
      wordWrap: "break-word",
      color: "white",
    },
    body16medium: {
      fontSize: "16px",
      fontWeight: "500",
      color: "white",
    },
    heading28medium: {
      fontSize: "28px",
      fontWeight: "500",
      color: "white",
      textTransform: "uppercase",
    },
    menu: {
      fontFamily: 'QuinqueFive',
      fontSize: "16px",
      color: "white",
      "&:hover": {
        color: "#FFF315",
      },
    },
    link16medium: {
      color: "white",
      testDecoration: "none",
    },
    time: {
      color: " #747474",
      fontSize: "10px",
      textAlign: "right",
    },
    content: {
      color: "white",
      fontSize: "16px",
      fontWeight: "500",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": ["Noto Sans TC"],
        color: "white",
      },
    },
  },
})

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default Theme

// ref: https://material-ui.com/customization/themes/
