import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
        <span className={classes.title}>
          <img width="170px" src={Logo} alt="Tattoo Art logo" />
        </span>
        <span className={classes.navItems}>
          <Link variant="subtitle1" className={classes.link}>
            Discover
          </Link>
          <Link variant="subtitle1" className={classes.link}>
            Messages
          </Link>
          <Link variant="subtitle1" className={classes.link}>
            Notifications
          </Link>
          <Link variant="subtitle1" className={classes.createContestLink}>
            CREATE CONTEST
          </Link>
          {/* replace `demoProfilePhoto` with link to user photo */}
          <Avatar className={classes.profileImg} src={demoProfilePhoto} alt="Profile Photo" />
          {/* replace `Kenneth` with username */}
          <Link variant="subtitle1" className={classes.username}>
            Kenneth
          </Link>
          <AuthMenu />
        </span>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
