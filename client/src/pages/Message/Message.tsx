import { Grid } from '@material-ui/core';
import React from 'react';
import ConversationList from './SideBar/ConversationList/ConversationList';

export default function Message(): JSX.Element {
  return (
    <Grid container>
      <Grid>
        <ConversationList />
      </Grid>
    </Grid>
  );
}
