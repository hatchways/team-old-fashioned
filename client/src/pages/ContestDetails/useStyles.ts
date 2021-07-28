import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    paddingTop: 40,
    paddingBottom: 20,
  },
  breadcrumb: {
    color: theme.palette.text.secondary,
    fontWeight: 600,
  },
  contestTitle: {
    color: '#000000',
    fontWeight: 600,
    textAlign: 'left',
    paddingRight: 20,
    alignContent: 'center',
  },
  titleColumn: {
    paddingTop: 32,
  },
  prize: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    textAlign: 'left',
    backgroundColor: theme.palette.primary.main,
    pointerEvents: 'none',
    borderRadius: 0,
  },
  winnerButton: {
    borderRadius: 0,
    textTransform: 'uppercase',
  },
  ownerColumn: {
    paddingTop: 8,
  },
  userText: {
    paddingLeft: 8,
    fontWeight: 600,
  },
  spacer: {
    paddingTop: 32,
  },
}));

export default useStyles;
