import { FC, Fragment } from 'react';
import { IPaymentMethod } from '../../interface/Payments';
import { Card, Typography } from '@material-ui/core';
import useStyles from './useStyles';

interface Props {
  paymentMethods: IPaymentMethod[];
}

const PaymentMethods: FC<Props> = ({ paymentMethods }: Props): JSX.Element => {
  const classes = useStyles();
  const pms = paymentMethods.map((pm) => {
    return (
      <Card variant="outlined" key={pm.id} className={classes.card}>
        <Typography>{`${pm.card.brand} card ending in: ${pm.card.last4}`}</Typography>
        <Typography>{`Expires: ${pm.card.exp_month} / ${pm.card.exp_year}`}</Typography>
      </Card>
    );
  });
  return <Fragment>{pms}</Fragment>;
};

export default PaymentMethods;
