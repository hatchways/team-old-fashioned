import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    margin: '15px 0',
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: '25px',
  },
  imagePaper: {
    height: '350px',
    overflow: 'auto',
    padding: '25px',
  },
}));

export default useStyles;
