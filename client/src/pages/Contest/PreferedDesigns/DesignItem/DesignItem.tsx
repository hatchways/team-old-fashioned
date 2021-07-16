import { FunctionComponent } from 'react';
import Card from '@material-ui/core/Card';
import useStyles from './useStyles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import img from '../../../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png';

interface Props {
  isSelected: boolean;
  imgSrc: string;
}

const DesignItem: FunctionComponent<Props> = ({ isSelected, imgSrc }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.designItem} square>
      <img src={img} className={classes.tattooImg} />
      {isSelected && (
        <div className={classes.clickedOverlay}>
          <CheckCircleOutlineIcon className={classes.check} />
        </div>
      )}
    </Card>
  );
};

export default DesignItem;
