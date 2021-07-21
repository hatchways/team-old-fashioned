import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 20,
    marginRight: '1rem',
  },
  fullName: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  textPreview: {
    fontSize: 12,
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
}));

export default useStyles;
