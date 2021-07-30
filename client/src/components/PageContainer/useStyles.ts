import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    textAlign: 'center',
    margin: '75px 0',
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

export default useStyles;
