import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

export default useStyles;
