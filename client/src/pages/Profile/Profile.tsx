import { useState, useEffect, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Card, CardMedia, Box, Avatar, Typography, Button } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { fetchProfile } from '../../helpers/APICalls/fetchProfile';
import { User } from '../../interface/User';
import { AuthContext } from '../../context/useAuthContext';
import useStyles from './useStyles';
import ProfileTabs from './Profile Tabs/ProfileTabs';

const Profile = ({ match }: RouteComponentProps): JSX.Element => {
  const classes = useStyles();
  const [profile, setProfile] = useState<User>();
  const { loggedInUser } = useContext(AuthContext);

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
    <Card className={classes.profileContainer}>
      <CardMedia
        className={classes.coverPhoto}
        image="https://images.unsplash.com/photo-1482375702222-03a768d5ea3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
        title="Cover Photo"
      />
      <Box textAlign="center" marginBottom={'1em'} justifyContent="center">
        <Avatar className={classes.profileImg} src={profile?.profilePicUrl} variant="circle" />
        <Typography component="h1" variant="h5" className={classes.name}>
          @{profile?.username}
        </Typography>
        <Typography className={classes.location}>
          <LocationOnIcon fontSize="inherit" />
          {profile?.location}
        </Typography>

        <Typography component="h2" variant="h6" className={classes.headline}>
          {profile?.headline}
        </Typography>
        <Box justifyContent="center" className={classes.bioGrid}>
          <Typography component="p" className={classes.bio}>
            {profile?.bio}
          </Typography>
        </Box>
      </Box>
      <Box textAlign="center" marginBottom={'1em'}>
        {profile?.username !== loggedInUser?.username ? (
          <Button
            component={Link}
            to={`/messages`}
            variant="outlined"
            color="primary"
            className={classes.messageButton}
          >
            Message
          </Button>
        ) : (
          <Button component={Link} to={`/profile`} variant="outlined" color="primary" className={classes.messageButton}>
            Edit Profile
          </Button>
        )}
      </Box>
      <Box textAlign="center">
        <ProfileTabs />
      </Box>{' '}
    </Card>
  );
};

export default Profile;
