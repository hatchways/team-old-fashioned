import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    paddingTop: 40,
    paddingBottom: 20,
  },

  titleColumn: {
    paddingTop: 32,
  },
  spacer: {
    paddingTop: 32,
  },
}));

export default useStyles;
