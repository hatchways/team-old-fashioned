import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

interface Props {
  linkTo: string;
  btnText: string;
}

const CustomButton = ({ linkTo, btnText }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Button component={Link} to={linkTo} variant="outlined" color="secondary" className={classes.customButton}>
      {btnText}
    </Button>
  );
};

export default CustomButton;
