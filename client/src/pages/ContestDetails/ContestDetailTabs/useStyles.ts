import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'transparent',
  },
  panel: {
    backgroundColor: '#ffffff',
  },
  caption: {
    fontWeight: 600,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  description: {
    margin: 'auto',
    maxWidth: 720,
  },
}));

export default useStyles;
