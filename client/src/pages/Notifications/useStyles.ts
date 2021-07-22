import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '80vh',
    paddingTop: 40,
    paddingBottom: 20,
  },

  titleColumn: {
    paddingTop: 32,
  },
  spacer: {
    paddingTop: 32,
  },
  customBadge: {
    color: '#90ee90',
  },
  notificationsPaper: {
    paddingTop: 50,
    minHeight: '60vh',
  },
}));

export default useStyles;
