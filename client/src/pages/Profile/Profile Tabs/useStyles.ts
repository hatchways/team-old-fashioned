import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'transparent',
  },
  panel: {
    backgroundColor: '#ffffff',
    minHeight: '25vh',
  },
  caption: {
    fontWeight: 600,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
}));

export default useStyles;
