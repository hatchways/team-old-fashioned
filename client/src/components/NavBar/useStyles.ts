import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    //padding: '1rem 1rem',
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
  createContestLink: {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    borderStyle: 'groove',
    borderBlockColor: '#FFFFFF',
    borderWidth: 1,
    padding: theme.spacing(1.5, 4),
    margin: theme.spacing(0, 6),
    noWrap: true,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  profileImg: {
    // margin: theme.spacing(0, 0, 0, 4),
  },
  username: {
    color: '#FFFFFF',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    // margin: theme.spacing(0, 0, 0, 2),
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

export default useStyles;
