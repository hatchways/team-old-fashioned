import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 41,
    paddingRight: 41,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 11,
      paddingRight: 11,
    },
  },
}));

export default useStyles;
