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
  tabPanelRoot: {
    width: '100%',
  },
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  panel: {
    width: '100%',
  },
}));

export default useStyles;
