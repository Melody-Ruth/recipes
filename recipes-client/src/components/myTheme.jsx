import { createTheme } from '@mui/material/styles';

const myTheme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
            main: "#4d892c",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#ff8337",
    },
    tertiary: {
      main: "#682c89",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
        paper: '#FFFFFFD9', // your color
    },
  },
  spacing: 8,
});

export default myTheme;