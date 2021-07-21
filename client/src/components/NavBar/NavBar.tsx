import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../../Images/logo.png';
import demoProfilePhoto from '../../Images/demo-profile-photo.png';
import useStyles from './useStyles';
import AuthMenu from '../AuthMenu/AuthMenu';
import { useAuth } from '../../context/useAuthContext';
import CustomButton from './CustomButton';

const NavBar = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const path = window.location.pathname;

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
                  <Link component={RouterLink} variant="subtitle1" className={classes.link} to="/">
                    Discover
                  </Link>
                </Box>
                <Box p={0}>
                  <Link component={RouterLink} variant="subtitle1" className={classes.link} to="/messages">
                    Messages
                  </Link>
                </Box>
                <Box p={0}>
                  <Link component={RouterLink} variant="subtitle1" className={classes.link} to="/notifications">
                    Notifications
                  </Link>
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
                <Box p={1.5}>
                  {/* replace `demoProfilePhoto` with link to user photo */}
                  <Avatar className={classes.profileImg} src={demoProfilePhoto} alt="Profile Photo" />
                </Box>
                <Box p={0}>
                  {/* replace `Kenneth` with username */}
                  <Link component={RouterLink} variant="subtitle1" className={classes.username} to="/profile">
                    Kenneth
                  </Link>
                </Box>
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
