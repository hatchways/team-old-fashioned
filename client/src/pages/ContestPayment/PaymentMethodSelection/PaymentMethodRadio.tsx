import { useState } from 'react';
import useStyles from './useStyles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { IPaymentMethod } from '../../../interface/Payments';
import chargeCard from '../../../helpers/APICalls/chargeCard';
import { useSnackBar } from '../../../context/useSnackbarContext';

interface Props {
  paymentMethods: IPaymentMethod[];
  contestId: string;
}

export default function PaymentMethodSelection({ paymentMethods, contestId }: Props): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState<string>(paymentMethods[0]?.id);

  const { updateSnackBarMessage } = useSnackBar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    const paymentIntentStatus = await chargeCard(contestId, value);
    if (paymentIntentStatus) {
      paymentIntentStatus.status === 'succeeded'
        ? updateSnackBarMessage(
            // Stripe unit for USD is in cents
            `${paymentIntentStatus.currency} ${
              paymentIntentStatus.amount_received / 100
            } has been charged from your account.`,
          )
        : updateSnackBarMessage(paymentIntentStatus.status);
    } else {
      updateSnackBarMessage(`Unable to charge`);
    }
  };

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend" className={classes.label}>
        Select card for payment
      </FormLabel>
      <RadioGroup
        aria-label="payment method selection"
        name="payment methods"
        value={value}
        onChange={handleChange}
        className={classes.selection}
      >
        {paymentMethods.map((pm: IPaymentMethod) => (
          <>
            <FormControlLabel
              value={pm.id}
              control={<Radio color="primary" />}
              label={`${pm.card.brand} card ending in: ${pm.card.last4}. Expires: ${pm.card.exp_month} / ${pm.card.exp_year}`}
            />
          </>
        ))}
      </RadioGroup>
      <Button onClick={handleSubmit} variant="outlined" color="primary" className={classes.button}>
        Pay for Design
      </Button>
    </FormControl>
  );
}
