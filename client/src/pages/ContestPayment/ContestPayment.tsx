import { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { PaymentMethodContext } from '../../context/usePaymentsContext';
import { ContestContext } from '../../context/useContestContext';
import PaymentMethodSelection from './PaymentMethodSelection/PaymentMethodRadio';

export default function ContestPayment({ match }: RouteComponentProps): JSX.Element {
  const classes = useStyles();
  const [contestId, setContestId] = useState<string>('');
  const { inactiveContests } = useContext(ContestContext);
  const { paymentMethods } = useContext(PaymentMethodContext);

  // const history = useHistory();
  useEffect(() => {
    const params = match.params as { id: string };
    setContestId(params.id);
  }, [match]);
  const contest = inactiveContests.find(function (contest) {
    return contest._id === contestId;
  });

  return (
    <Grid container component="main" className={classes.root} direction="column">
      <CssBaseline />
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} sm={10} md={8} className={classes.titleColumn}>
          <Box display="flex" flexWrap="nowrap" alignItems="center" bgcolor="transparent">
            <Box>
              <Typography className={classes.contestTitle} component="h1" variant="h5">
                {contest?.title}
              </Typography>
            </Box>
            <Box flexGrow={1}>
              <Button variant="contained" color="primary" disableElevation className={classes.prize}>
                ${contest?.prizeAmount}
              </Button>
            </Box>
          </Box>
          <Grid className={classes.spacer}>
            <PaymentMethodSelection paymentMethods={paymentMethods} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
