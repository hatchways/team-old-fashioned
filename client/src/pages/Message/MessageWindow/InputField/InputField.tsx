import { FormControl, FilledInput, Button } from '@material-ui/core';
import { useState, FormEvent, ChangeEvent } from 'react';
import { Conversation } from '../../../../interface/Message';
import useStyles from './useStyles';

export interface InputFieldPorps {
  message?: Conversation;
  newMessageHandler: (message: string) => void;
}

export default function InputField({ message, newMessageHandler }: InputFieldPorps): JSX.Element {
  const classes = useStyles();
  const [messageText, setMessageText] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    newMessageHandler(messageText);
    setMessageText('');
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
          disabled={!message ? true : false}
          placeholder={`Reply to ${message?.fullName}`}
          value={messageText}
          onChange={handleChange}
          className={classes.filledInput}
        />
        <Button
          type="submit"
          disabled={!message || messageText.trim().length === 0 ? true : false}
          size="large"
          variant="contained"
          color="primary"
          className={classes.btn}
        >
          Send
        </Button>
      </FormControl>
    </form>
  );
}
