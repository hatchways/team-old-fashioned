import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  label: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 14,
    color: theme.palette.primary.main,
    marginInline: 'auto',
  },
  selection: {
    minHeight: 200,
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

export default useStyles;
