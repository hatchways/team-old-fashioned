import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  contestItemContainer: {
    marginBottom: 25,
  },
  item: {
    width: 175,
    height: 175,
  },
  contestImg: {
    objectFit: 'cover',
  },
  infoContainer: {
    textAlign: 'left',
    margin: '25px 0 25px 40px',
  },
  headline: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  byline: {
    color: '#999',
    fontSize: 12,
    marginTop: '10px',
  },
  deadline: {
    color: '#999',
    fontSize: 10,
    marginTop: '10px',
  },
  btn: {
    margin: theme.spacing(3, 0, 2),
    padding: 10,
    color: '#fff',
    height: 30,
    borderRadius: 0,
    marginTop: 25,
    fontSize: 12,
    backgroundColor: '#000',
    fontWeight: 'bold',
  },
}));

export default useStyles;
