import { Grid } from '@material-ui/core';
import React from 'react';
import ConversationList from './SideBar/ConversationList/ConversationList';
import { mockMessage } from '../../mocks/mockMessage';

export default function Message(): JSX.Element {
  return (
    <Grid container>
      <Grid>
        <ConversationList conversationList={mockMessage} />
      </Grid>
    </Grid>
  );
}
