import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '1rem',
  },
  bubbleContainer: {
    background: 'white',
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 10%), 0px 2px 2px 0px rgb(0 0 0 / 10%), 0px 1px 5px 0px rgb(0 0 0 / 20%)',
    borderRadius: '10px 10px 0 10px',
  },
  text: {
    fontSize: 14,
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: 'bold',
  },
}));

export default useStyles;
