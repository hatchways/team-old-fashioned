import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    paddingTop: 60,
    paddingBottom: 20,
  },
  contestInfo: {
    paddingTop: 32,
    marginInline: 'auto',
  },
  prize: {
    fontWeight: theme.typography.fontWeightBold,
  },
  selection: {
    marginInline: 'auto',
    marginTop: 16,
  },
}));

export default useStyles;
