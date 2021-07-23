import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '80vh',
    paddingTop: 40,
    paddingBottom: 20,
  },
  titleColumn: {
    paddingTop: 32,
    maxWidth: 600,
  },
  pageTitle: {
    fontWeight: 600,
  },
  spacer: {
    paddingTop: 32,
  },
  customBadge: {
    color: '#90ee90',
  },
  notificationsPaper: {
    minHeight: '60vh',
    padding: 24,
  },
}));

export default useStyles;
