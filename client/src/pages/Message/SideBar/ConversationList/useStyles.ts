import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
    borderRadius: 0,
  },
  sideBarContainer: {
    zIndex: 10,
    borderRadius: 0,
    width: 250,
  },
  sideBarTitle: {
    borderRadius: 0,
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: 600,
    padding: '23px',
  },
  sideBarValue: {
    borderRadius: 0,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.1)',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
  selectedConversation: {
    border: '1px solid #000',
    borderWidth: '0 5px 0 0',
  },
}));

export default useStyles;
