import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'transparent',
  },
  vignette: {
    position: 'relative',
    '&:after': {
      content: '',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      boxShadow: '0 0 150px 30px rgba(0, 0, 0, 1) inset',
    },
  },
}));

export default useStyles;
