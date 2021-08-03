import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
  },
  link: {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    textDecoration: 'none',
    margin: theme.spacing(0, 4),
    '&:hover': {
      textDecoration: 'none',
    },
  },
  customButton: {
    borderRadius: 0,
    textAlign: 'center',
  },
  profileImg: {
    display: 'inline-block',
  },
  profileLink: {
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
    paddingLeft: 15,
    paddingRight: 0,
  },
  username: {
    color: theme.palette.text.secondary,
    display: 'inline-block',
    marginLeft: theme.spacing(1),
  },
}));

export default useStyles;
