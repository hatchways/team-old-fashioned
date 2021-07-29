import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
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
  stripeInputContainer: {
    borderColor: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    border: '1px solid',
    color: theme.palette.text.primary,
    padding: '18px 15px',
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
  helperTextError: {
    marginLeft: 14,
    marginRight: 14,
    color: '#f44336;',
  },
}));

export default useStyles;
