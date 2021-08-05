import { useState } from 'react';
import useStyles from './useStyles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { IPaymentMethod } from '../../../interface/Payments';

interface Props {
  paymentMethods: IPaymentMethod[];
}
export default function PaymentMethodSelection({ paymentMethods }: Props): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState<string>(paymentMethods[0]?.id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  console.log(value);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Select card for payment</FormLabel>
        <RadioGroup aria-label="payment method selection" name="payment methods" value={value} onChange={handleChange}>
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
        <Button type="submit" variant="outlined" color="primary" className={classes.button}>
          Pay for Design
        </Button>
      </FormControl>
    </form>
  );
}
