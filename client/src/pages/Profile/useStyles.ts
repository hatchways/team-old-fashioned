import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    maxWidth: 960,
    margin: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  avatarContainer: {
    marginTop: '15px',
    width: '100%',
    margin: 'auto',
  },
  tabsContainer: {
    width: '100%',
    margin: 'auto',
  },
  name: {
    color: theme.palette.primary.main,
    fontSize: 16,
    marginTop: 10,
  },
  location: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 12,
  },
  headline: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 14,
  },
  bio: {
    fontSize: 12,
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
  winnerButton: {
    borderRadius: 0,
    textTransform: 'uppercase',
  },
}));

export default useStyles;
