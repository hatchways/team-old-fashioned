import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    '& label': {
      fontSize: 16,
      color: '#000',
      fontWeight: 'bold',
    },
    '& input': {
      borderRadius: '0px',
    },
  },
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: 0,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: '#000',
    fontWeight: 'bold',
  },
  '& label': {
    backgroundColor: 'red',
  },
}));

export default useStyles;
