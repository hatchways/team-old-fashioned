import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    maxWidth: 960,
    marginInline: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  coverPhoto: {
    height: 160,
  },
  profileImg: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    border: '4px solid #ffffff',
    position: 'static',
    display: 'inline-flex',
    marginTop: '-64px',
    '& .MuiAvatar-fallback': {
      color: theme.palette.secondary,
    },
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
    marginTop: '0.5em',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 14,
  },
  bio: {
    fontSize: 12,
  },
  bioGrid: {
    display: 'grid',
    gridAutoColumns: '72%',
  },

  button: {
    borderRadius: 0,
    textTransform: 'uppercase',
  },
}));

export default useStyles;
