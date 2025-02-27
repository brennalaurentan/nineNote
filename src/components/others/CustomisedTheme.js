import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let CustomisedTheme = createTheme({
  palette: {
    red: {
      main: '#DB4453',
      light: '#FCEDEE',
      dark: '#64050B',
    },
    orange: {
      main: '#EF725D',
    },
    yellow: {
      main: '#F4CC7B',
      light: '#FFF6E5',
      dark: '#4F4023',

    },
    lime_green: {
      main: '#8EBF50',
    },
    green: {
      main: '#4FBD74',
    },
    light_blue: {
      main: '#3BAED9',
      light: '#ECF7FC',
      dark: '#2681A3',
    },
    blue: {
      main: '#4F87DB',
      light: '#EEF4FC',
      dark: '#2959A0',
      contrastText: '#FFF',
    },
    purple: {
      main: '#967BDC',
    },
    pink: {
      main: '#D870AD',
    },
    black: {
      main: '#303030',
    },
    dark_gray: {
      main: '#5B5B5B',
    },
    light_gray: {
      main: '#EEEEEE',
    },
    off_white: {
      main: '#F8F8F8',
    },
    white: {
      main: '#FFFFFF',
    },
  },
  typography: {
    logo: {
      fontSize: "25px",
      fontWeight: "200",
      fontFamily: "Darumadrop One",
    },
    h1: {
      fontSize: "40px",
      fontWeight: "700",
      fontFamily: "Inter",
    },
    h2: {
      fontSize: "32px",
      fontWeight: "600",
      fontFamily: "Inter",
    },
    h3: {
      fontSize: "26px",
      fontWeight: "600",
      fontFamily: "Inter",

    },
    h4: {
      fontSize: "22px",
      fontWeight: "600",
      fontFamily: "Inter",

    },
    body_bold: {
      fontSize: "16px",
      fontWeight: "600",
      fontFamily: "Inter",
    },
    body_thin: {
      fontSize: "16px",
      fontWeight: "400",
      fontFamily: "Inter",
    },
    tag_bold: {
      fontSize: "14px",
      fontWeight: "600",
      fontFamily: "Inter",
    },
    tag_thin: {
      fontSize: "14px",
      fontWeight: "400",
      fontFamily: "Inter",
    },
    tiny_tag_bold: {
      fontSize: "12px",
      fontWeight: "600",
      fontFamily: "Inter",
    },
  },
});

CustomisedTheme = responsiveFontSizes(CustomisedTheme);

export default CustomisedTheme