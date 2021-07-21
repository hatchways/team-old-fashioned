import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
  },
  sideBarContainer: {
    zIndex: 10,
  },
  sideBarTitle: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: 600,
    padding: '23px',
  },
  sideBarValue: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.1)',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
}));

export default useStyles;
