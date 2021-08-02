import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
  },
  panel: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: '25vh',
  },
}));

export default useStyles;
