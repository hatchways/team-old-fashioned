import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
  },
  cardContainer: {
    width: '100%',
    margin: 'unset',
  },
  formContainer: {
    marginBottom: '100px',
    backgroundColor: 'grey',
  },
  card: {
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    borderRadius: '16px',
    boxShadow: '0px 3px 18px 3px rgba(0, 0, 0, 0.2)',
    alignContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: '30px 0 0',
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    alignContent: 'center',
    alignItems: 'center',
  },
  prize: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    textAlign: 'left',
    backgroundColor: theme.palette.primary.main,
    pointerEvents: 'none',
    borderRadius: 0,
  },
}));

export default useStyles;
