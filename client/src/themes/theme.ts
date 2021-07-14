import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Poppins", "sans-serif", "Roboto"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: '"Poppins","sans-serif"',
    },
  },
  palette: {
    primary: { main: '#000000' },
  },
  shape: {
    borderRadius: 5,
  },
  overrides: {
    MuiTypography: {
      subtitle1: {
        fontWeight: 600,
      },
    },
  },
});
