import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: 10,
    padding: 10,
    color: theme.palette.text.primary,
  },
}));

export default useStyles;
