import React, { useState, MouseEvent, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { NotificationsContext } from '../../context/useNotificationsContext';
import { NotificationsList } from '../../pages/Notifications/NotificationsList/NotificationsList';

interface Props {
  type: 'submission' | 'message';
  children: JSX.Element;
}

const NotifsMsgDropdown = ({ type, children }: Props): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { notifications } = useContext(NotificationsContext);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Show only last 12 unread notifications in the dropdown
  const unread = notifications
    .filter(function (notif) {
      return notif.type === type && notif.readStatus === false;
    })
    .slice(length - 12);

  return (
    <div>
      <IconButton
        aria-label="notifications dropdown"
        aria-controls="notifs-msg-dropdown"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {/* Navbar item */}
        {children}
        {/* TODO: Incorporate badge indicator for unread notifications */}
      </IconButton>
      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        getContentAnchorEl={null}
      >
        {/* Link to all Notifications / Messages page */}
        <MenuItem
          component={RouterLink}
          to={type === 'message' ? '/messages' : '/notifications'}
          disableGutters={true}
          onClick={handleClose}
          className={classes.link}
        >
          <Typography variant="subtitle1">See all {type === 'message' ? 'messages' : 'notifications'}</Typography>
        </MenuItem>
        <MenuItem disableGutters={true} alignItems="center">
          <Grid item xs={12} className={classes.dropDown}>
            <NotificationsList notifications={unread} type="dropdown" />
          </Grid>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NotifsMsgDropdown;
