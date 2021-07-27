import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  tabs: {
    boxShadow: '0 0 15px rgba(0,0,0,0.75)',
    clipPath: 'inset(0px -15px 0px 0px)',
    height: '100vh',
    width: 300,
    '& .MuiTab-wrapper': {
      alignItems: 'end',
      fontSize: '16px',
      padding: '20px',
      color: theme.palette.secondary,
    },
  },
}));

export default useStyles;
