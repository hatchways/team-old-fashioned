import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '60vh',
    backgroundColor: theme.palette.background.paper,
    minWidth: 400,
  },

  titleColumn: {
    paddingTop: 32,
  },
  spacer: {
    paddingTop: 32,
  },
  readIndicator: {
    color: '#00ff00',
  },
  notificationsPaper: {
    minHeight: '60vh',
  },
}));

export default useStyles;
