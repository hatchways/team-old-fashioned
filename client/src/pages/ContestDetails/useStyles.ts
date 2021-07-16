import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    // '& a': {
    //   textDecoration: 'none',
    //   color: theme.palette.text.secondary,
    // },
    // '& a:visited, a:active': {
    //   color: theme.palette.text.secondary,
    // },
  },
  breadcrumb: {
    color: '#cccccc',
  },
  navigation: {
    backgroundColor: theme.palette.text.primary,
    height: '70px',
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
  contestTitle: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 600,
    textAlign: 'left',
    margin: '75px 0',
  },
  prize: {
    color: theme.palette.text.secondary,
    fontSize: 26,
    paddingBottom: 20,
    fontWeight: 600,
    textAlign: 'left',
    margin: '75px 0',
  },
  profilePhoto: {},
  formPaper: {
    paddingTop: '50px',
  },
}));

export default useStyles;
