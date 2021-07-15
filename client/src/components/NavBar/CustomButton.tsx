import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

interface Props {
  linkTo: string;
  btnText: string;
}

const CustomButton = ({ linkTo, btnText }: Props): JSX.Element => {
  return (
    <Link to={linkTo}>
      <Button
        variant="outlined"
        color="secondary"
        style={{
          borderRadius: 0,
        }}
      >
        {btnText}
      </Button>
    </Link>
  );
};

export default CustomButton;
