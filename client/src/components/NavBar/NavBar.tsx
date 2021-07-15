import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../../Images/logo.png';
import demoProfilePhoto from '../../Images/demo-profile-photo.png';
import useStyles from './useStyles';
import AuthMenu from '../AuthMenu/AuthMenu';

const NavBar = (): JSX.Element => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <div style={{ width: '100%' }}>
          <Box display="flex" flexWrap="nowrap" p={1} m={1} alignItems="center" bgcolor="transparent">
            <Box p={1} flexGrow={1}>
              <img width="170px" src={Logo} alt="Tattoo Art logo" />
            </Box>
            <Box p={0}>
              <Link variant="subtitle1" className={classes.link}>
                Discover
              </Link>
            </Box>
            <Box p={0}>
              <Link variant="subtitle1" className={classes.link}>
                Messages
              </Link>
            </Box>
            <Box p={0}>
              <Link variant="subtitle1" className={classes.link}>
                Notifications
              </Link>
            </Box>
            <Box p={1} flexWrap="nowrap">
              <Link variant="subtitle1" className={classes.createContestLink}>
                CREATE CONTEST
              </Link>
            </Box>
            <Box p={1.5}>
              {/* replace `demoProfilePhoto` with link to user photo */}
              <Avatar className={classes.profileImg} src={demoProfilePhoto} alt="Profile Photo" />
            </Box>
            <Box p={0}>
              {/* replace `Kenneth` with username */}
              <Link variant="subtitle1" className={classes.username}>
                Kenneth
              </Link>
            </Box>
            <Box p={0}>
              <AuthMenu />
            </Box>
          </Box>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
