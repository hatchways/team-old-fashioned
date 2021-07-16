import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,
  },
  tabContainer: {
    width: '25%',
    height: '100vh',
    display: 'flex',
  },
  tabDisplay: {
    width: 'auto',
  },
  tabs: {
    '& .MuiTab-wrapper': {
      alignItems: 'end',
      fontSize: '16px',
      padding: '20px',
      color: 'grey',
    },
  },
}));

export default useStyles;
