import { blue } from "@material-ui/core/colors";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const COLOR1 = "#0D0D0D"; // dark gray
const COLOR2 = "#6ec6d8"; // bluish
const COLOR3 = "#03FCF5"; // bright bluish- Tetra

// const PRIMARY_TEXT = '#dbdbdb';
const PRIMARY_TEXT = "#dbdbdb";
const SECONDARY_TEXT = "#7B7B7B";

export const HEADER_HEIGHT_REM = 6;

export const baseTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      // TODO : Adjust all styles after structure is done
      type: "dark",
      primary: { main: "#09142c" },
      secondary: { main: "#74f6fd" },
      background: {
        default: "#0a0f25",
        // paper: "#192a45",
        paper: "#09142c",
      },
    },
    typography: {
      // fontFamily: 'Montserrat',
    },
    overrides: {
      MuiPaper: {
        root: {
          // backgroundColor: COLOR1,
        },
      },
      MuiTypography: {
        colorPrimary: {
          // color: PRIMARY_TEXT,
        },
      },
      MuiLink: {
        root: {
          // color: blue[500],
        },
      },
    },
  })
);

export const AppStyles = {};
