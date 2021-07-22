import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '60vh',
    backgroundColor: theme.palette.background.paper,
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
    minHeight: '60vh',
  },
}));

export default useStyles;
