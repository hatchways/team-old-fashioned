import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
  },
  title: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(4),
  },
  navItems: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
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
  },
  profileImg: {},
  username: {
    color: '#FFFFFF',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

export default useStyles;
