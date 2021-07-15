import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  designItem: {
    width: '175px',
    height: '175px',
    margin: '5px',
    position: 'relative',
    '&:hover .clickedOverlay': {
      display: 'block',
      background: 'rgba(0, 0, 0, .6)',
      border: '1px solid red',
    },
  },
  tattooImg: {
    width: '100%',
    height: '100%',
  },
  clickedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'block',
    background: 'rgba(0, 0, 0, .6)',
    textAlign: 'center',
  },
  check: {
    width: '50px',
    height: '50px',
    color: '#ccc',
    margin: '36% 0',
  },
}));

export default useStyles;
