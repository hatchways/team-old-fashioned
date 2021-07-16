import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    '& a': {
      textDecoration: 'none',
      color: '#fff',
    },
    '& a:visited, a:active': {
      color: '#fff',
    },
  },
  navigation: {
    backgroundColor: '#000',
    height: '70px',
  },
  logo: {
    textTransform: 'capitalize',
    fontSize: '14px',
    letterSpacing: '4px',
    color: '#fff',
    fontWeight: 'bold',
    padding: '0 0 0 25px',
    '&:hover': {
      border: '0',
    },
  },
  link: {
    display: 'inline-block',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'bold',
    width: '100px',
    height: '40px',
    textAlign: 'center',
    margin: '0 15px',
    padding: '10px 0 0 0',
    '&:hover': {
      border: '1px solid #fff',
    },
  },
  active: {
    border: '1px solid #fff',
  },
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    textAlign: 'center',
    margin: '75px 0',
  },
  formPaper: {
    paddingTop: '50px',
  },
}));

export default useStyles;
