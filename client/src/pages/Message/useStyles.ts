import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'unset',
    height: '100%',
  },
  messageContainer: {
    width: '100%',
  },
}));

export default useStyles;
