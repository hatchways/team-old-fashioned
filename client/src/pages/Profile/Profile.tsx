import { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Grid, Box, Avatar, Typography, Button } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { fetchProfile } from '../../helpers/APICalls/fetchProfile';
import { User } from '../../interface/User';
import useStyles from './useStyles';
import ProfileTabs from './Profile Tabs/ProfileTabs';

const Profile = ({ match }: RouteComponentProps): JSX.Element => {
  const classes = useStyles();
  const [profile, setProfile] = useState<User>();

  useEffect(() => {
    const { username } = match.params as { username: string };
    const getProfile = async (username: string) => {
      const response = await fetchProfile(username);
      if (response) {
        setProfile(response);
      }
    };

    getProfile(username);
  }, [match]);

  return (
    <Grid container direction="column" className={classes.profileContainer}>
      <Grid xs={12} item className={classes.avatarContainer}>
        <Box textAlign="center">
          <Avatar className={classes.profileImg} src={profile?.profilePicUrl} />
          <Typography component="h1" variant="h5" className={classes.name}>
            @{profile?.username}
          </Typography>
          <Typography className={classes.location}>
            <LocationOnIcon fontSize="inherit" />
            {profile?.location}
          </Typography>
        </Box>
      </Grid>
      <Box display="flex" flexWrap="nowrap" alignItems="center" bgcolor="transparent">
        <Box flexGrow={1} mr={2}>
          <Typography component="h2" variant="h6" className={classes.headline}>
            {profile?.headline}
          </Typography>
          <Typography component="p" className={classes.bio}>
            {profile?.bio}
          </Typography>
        </Box>
        <Box>
          <Button component={Link} to={`/messages`} variant="outlined" color="primary" className={classes.winnerButton}>
            Message
          </Button>
        </Box>
      </Box>
      <Grid xs={12} item className={classes.tabsContainer}>
        <Box textAlign="center">
          <ProfileTabs />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
