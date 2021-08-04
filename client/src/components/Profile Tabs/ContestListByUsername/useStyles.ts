import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minWidth: 400,
  },
  link: {
    color: theme.palette.text.primary,
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
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
  prize: {
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'left',
    backgroundColor: theme.palette.primary.main,
    pointerEvents: 'none',
    borderRadius: 0,
  },
}));

export default useStyles;
