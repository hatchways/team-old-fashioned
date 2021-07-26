import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    marginTop: 35,
  },
  btn: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 80,
    height: 30,
    borderRadius: 0,
    marginTop: 25,
    fontSize: 9,
    backgroundColor: '#000',
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: '100%',
    margin: 'auto',
  },
  tabsContainer: {
    width: '100%',
    margin: '55px auto',
  },
  name: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileImg: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    display: 'block',
    margin: 'auto',
    '& .MuiAvatar-fallback': {
      color: theme.palette.secondary,
    },
  },
}));

export default useStyles;
