import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '60vh',
    backgroundColor: theme.palette.background.paper,
    minWidth: 400,
  },

  readIndicator: {
    color: '#00ff00',
  },
}));

export default useStyles;
