import { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { useSnackBar } from '../../context/useSnackbarContext';
import { usePayment } from '../../context/usePaymentsContext';
import { useContest } from '../../context/useContestContext';
import PaymentMethodSelection from './PaymentMethodSelection/PaymentMethodRadio';

export default function ContestPayment({ match }: RouteComponentProps): JSX.Element {
  const classes = useStyles();
  const [contestId, setContestId] = useState<string>('');
  const { inactiveContests } = useContest();
  const { paymentMethods } = usePayment();
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();

  if (paymentMethods.length === 0) {
    updateSnackBarMessage('Please add a payment method.');
    history.push('/profile');
  }

  useEffect(() => {
    const params = match.params as { id: string };
    setContestId(params.id);
  }, [match]);
  const contest = inactiveContests.find(function (contest) {
    return contest._id === contestId;
  });

  return (
    <Grid container component="main" className={classes.root} direction="column">
      <Grid item xs={12} sm={10} md={8} className={classes.contestInfo}>
        <Typography component="h1" variant="h5" align="center">
          Payment for {contest?.title} Contest
        </Typography>
        <Typography component="h2" variant="h6" align="center" className={classes.prize}>
          Prize: ${contest?.prizeAmount}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={10} md={8} className={classes.selection}>
        <PaymentMethodSelection contestId={contestId} paymentMethods={paymentMethods} />
      </Grid>
    </Grid>
  );
}
