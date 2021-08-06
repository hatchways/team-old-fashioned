import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../../Images/logo.png';
import useStyles from './useStyles';
import AuthMenu from '../AuthMenu/AuthMenu';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import CustomButton from './CustomButton';
import NotifsMsgDropdown from '../NotifsMsgDropdown/NotifsMsgDropdown';
import Typography from '@material-ui/core/Typography';

const NavBar = (): JSX.Element => {
  const { initSocket, socket } = useSocket();
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const path = window.location.pathname;

  useEffect(() => {
    if (loggedInUser) {
      initSocket();
    }
  }, [initSocket, loggedInUser]);

  useEffect(() => {
    if (loggedInUser) {
      socket?.emit('USER_LOGIN', loggedInUser?.email);
    }
  }, [socket, loggedInUser]);

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <div style={{ width: '100%' }}>
          <Box display="flex" flexWrap="nowrap" p={1} m={1} alignItems="center" bgcolor="transparent">
            <Box p={1} flexGrow={1}>
              <Link component={RouterLink} to="/">
                <img width="170px" src={Logo} alt="Tattoo Art logo" />
              </Link>
            </Box>
            {loggedInUser ? (
              <>
                <Box p={0}>
                  <Link component={RouterLink} variant="subtitle1" className={classes.link} to="/discovery">
                    Discover
                  </Link>
                </Box>
                <Box p={0}>
                  <NotifsMsgDropdown type="message">
                    <Typography variant="subtitle1" className={classes.link}>
                      Messages
                    </Typography>
                  </NotifsMsgDropdown>
                </Box>
                <Box p={0}>
                  <NotifsMsgDropdown type="submission">
                    <Typography variant="subtitle1" className={classes.link}>
                      Notifications
                    </Typography>
                  </NotifsMsgDropdown>
                </Box>
              </>
            ) : (
              <Box p={0}></Box>
            )}
            <Box px={6} flexWrap="nowrap">
              {loggedInUser ? (
                <CustomButton linkTo="/new-contest" btnText="CREATE CONTEST" />
              ) : path === '/login' ? (
                <CustomButton linkTo="/signup" btnText="SIGNUP" />
              ) : (
                <CustomButton linkTo="/login" btnText="SIGN IN" />
              )}
            </Box>
            {loggedInUser ? (
              <>
                <Link
                  component={RouterLink}
                  variant="subtitle1"
                  className={classes.profileLink}
                  to={`/users/${loggedInUser.username}`}
                >
                  <Box alignItems="center" display="flex">
                    <Avatar className={classes.profileImg} src={loggedInUser?.profilePicUrl} alt="Profile Photo" />
                    <Typography variant="subtitle1" className={classes.username}>
                      {loggedInUser.username}
                    </Typography>
                  </Box>
                </Link>
                <Box p={0}>
                  <AuthMenu />
                </Box>
              </>
            ) : (
              <Box p={0}></Box>
            )}
          </Box>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
