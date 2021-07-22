import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: '1rem',
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
  },
  bubbleContainer: {
    backgroundColor: '#f4f4f9',
    borderRadius: '0 10px 10px 10px',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: -0.2,
    padding: 8,
  },
}));

export default useStyles;
