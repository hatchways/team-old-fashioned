import { FC } from 'react';
import { Typography, Box, Paper, Container } from '@material-ui/core';
import useStyles from './useStyles';

interface Props {
  titleEl: JSX.Element | string;
  children: JSX.Element;
}
const PageContainer: FC<Props> = ({ titleEl, children }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Container>
      <Box textAlign="center" className={classes.title}>
        {titleEl}
      </Box>
      <Paper className={classes.paper} elevation={6} square>
        {children}
      </Paper>
    </Container>
  );
};

export default PageContainer;
