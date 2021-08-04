import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    marginTop: 35,
  },
  btn: {
    margin: theme.spacing(2, 2, 2),
    padding: 10,
    width: 80,
    height: 30,
    borderRadius: 0,
    fontSize: 9,
    backgroundColor: '#000',
    fontWeight: 'bold',
  },
  coverPhoto: {
    height: 160,
    position: 'relative',
  },
  coverPhotoButton: {
    padding: 10,
    width: 80,
    height: 30,
    borderRadius: 0,
    fontSize: 9,
    backgroundColor: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
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
    width: theme.spacing(14),
    height: theme.spacing(14),
    border: '4px solid #ffffff',
    position: 'relative',
    display: 'inline-flex',
    marginTop: '-64px',
    '& .MuiAvatar-fallback': {
      color: theme.palette.secondary,
    },
  },
}));

export default useStyles;
