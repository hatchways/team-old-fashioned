import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "sans-serif", "Roboto"',
    fontSize: 12,
    fontWeightBold: 600,
    fontWeightRegular: 400,
    button: {
      textTransform: 'none',
      fontWeight: 600,
      label: {
        padding: 1,
      },
    },
    subtitle1: {
      fontFamily: '"Poppins","sans-serif"',
    },
  },
  palette: {
    primary: { main: '#000000' },
    secondary: { main: '#FFFFFF' },
    text: {
      primary: '#000000',
      secondary: '#CCCCCC',
    },
  },
  shape: {
    borderRadius: 5,
  },
  overrides: {
    MuiTypography: {
      subtitle1: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
    },
  },
});
