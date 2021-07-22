import { FormControl, FilledInput, Button } from '@material-ui/core';
import { useState, FormEvent, ChangeEvent } from 'react';
import { Conversation } from '../../../../interface/Message';
import useStyles from './useStyles';

export interface InputFieldPorps {
  text?: Conversation;
}

export default function InputField({ text }: InputFieldPorps): JSX.Element {
  const classes = useStyles();
  const [messageText, setMessageText] = useState<string>('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel className={classes.formControl}>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder={`Reply to ${text?.fullName}`}
          value={messageText}
          onChange={handleChange}
          className={classes.filledInput}
        />
        <Button type="submit" size="large" variant="contained" color="primary" className={classes.btn}>
          Send
        </Button>
      </FormControl>
    </form>
  );
}
