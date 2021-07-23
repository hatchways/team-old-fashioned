import React, { useState, MouseEvent, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import { Notification } from '../../interface/Notifications';
import { FetchOptions } from '../../interface/FetchOptions';
import { NotificationsList } from '../../pages/Notifications/NotificationsList/NotificationsList';

interface Props {
  type: 'submission' | 'message';
}

const NotifsMsgDropdown = ({ type }: Props): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const saveNotifications = (notifications: Notification[]) => {
    setNotifications(notifications);
  };

  useEffect(() => {
    let active = true;

    const getNotifications = async () => {
      const fetchOptions: FetchOptions = {
        method: 'GET',
        credentials: 'include',
      };
      try {
        const response = await fetch(`/notifications`, fetchOptions);
        const json = await response.json();
        if (active && json) {
          console.log(json);
          saveNotifications(json);
        }
      } catch (error) {
        console.log('Unable to connect to server. Please try again.', error);
      }
    };
    getNotifications();

    return () => {
      active = false;
    };
  }, []);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const unread = notifications
    .filter(function (notif) {
      return notif.type === type && notif.readStatus === false;
    })
    .slice(length - 5);

  return (
    <div>
      <IconButton
        aria-label="notifications dropdown"
        aria-controls="notifs-msg-dropdown"
        aria-haspopup="true"
        className={classes.dropDown}
        onClick={handleClick}
      >
        {/* While fetching unread is still not integrated */}
        <FiberManualRecordOutlinedIcon className={classes.dropDownIcon} />
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
        <MenuItem component={Link} to={'/profile'}>
          <NotificationsList notifications={unread} />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NotifsMsgDropdown;
