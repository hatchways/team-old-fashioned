import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    marginTop: 15,
    marginLeft: '4px',
    position: 'absolute',
    bottom: '10px',
    backgroundColor: 'white',
    borderTop: '1px solid grey',
    paddingTop: '20px',
    [theme.breakpoints.down('xs')]: {
      bottom: '0%',
    },
  },
  input: {
    marginLeft: '50px',
    width: '70%',
    height: '3.5rem',
    boxShadow: '0px -4px 3px rgba(50, 50, 50, 0.1)',
    backgroundColor: 'white',
    [theme.breakpoints.down('xs')]: {
      height: '3rem',
    },
    '&:focused': {
      backgroundColor: 'white',
    },
  },
  formControl: {
    position: 'relative',
    zIndex: 99,
  },
  filledInput: {
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  btn: {
    margin: theme.spacing(3, 2, 2),
    width: 120,
    height: 45,
    marginTop: 49,
    borderRadius: 0,
    fontWeight: 'bold',
    position: 'absolute',
    right: '5%',
    bottom: '-18%',
    [theme.breakpoints.down('xs')]: {
      width: 90,
      height: 35,
      right: 0,
      bottom: '-30%',
    },
  },
}));

export default useStyles;
