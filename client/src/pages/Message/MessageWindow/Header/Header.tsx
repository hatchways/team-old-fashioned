import { Box, Grid, Typography } from '@material-ui/core';
import { Conversation } from '../../../../interface/Message';
import AvatarIcon from '../../SideBar/AvatarIcon/AvatarIcon';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './useStyles';

export interface HeaderProps {
  header?: Conversation;
}
export default function Header({ header }: HeaderProps): JSX.Element {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" className={classes.root}>
      <Grid className={classes.headerInfo}>
        <AvatarIcon conversationItem={header} />
        <Typography className={classes.headerName}>{header?.fullName}</Typography>
      </Grid>
      <Grid className={classes.moreInfoIcon}>
        <MoreHorizIcon />
      </Grid>
    </Box>
  );
}
