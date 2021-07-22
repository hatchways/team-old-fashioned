import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '5rem',
    height: 76,
    boxShadow: '0 2px 20px 0 rgba(88,133,196,0.10)',
    top: '12.6%',
    zIndex: 7,
    backgroundColor: '#DCDCDC',
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '30px',
  },
  headerName: {
    fontWeight: 'bold',
    fontSize: 'large',
  },
  moreInfoIcon: {
    marginRight: '40px',
  },
}));

export default useStyles;
