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

  boldText: {
    fontWeight: theme.typography.fontWeightBold,
  },

  regularText: {
    fontWeight: theme.typography.fontWeightRegular,
  },
  italicText: {
    fontStyle: 'italic',
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default useStyles;
