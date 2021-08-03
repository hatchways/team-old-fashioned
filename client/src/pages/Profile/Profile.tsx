import { useState, useEffect, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Card, CardMedia, Box, Avatar, Typography, Button } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { fetchProfile } from '../../helpers/APICalls/fetchProfile';
import { getContestsByUsername } from '../../helpers/APICalls/contest';
import { User } from '../../interface/User';
import { ContestAPIData } from '../../interface/Contest';
import { AuthContext } from '../../context/useAuthContext';
import useStyles from './useStyles';
import ProfileTabs from '../../components/Profile Tabs/ProfileTabs';

const Profile = ({ match }: RouteComponentProps): JSX.Element => {
  const classes = useStyles();
  const [profile, setProfile] = useState<User>();
  const [contests, setContests] = useState<ContestAPIData[]>([]);
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    const { username } = match.params as { username: string };
    const getProfile = async (username: string) => {
      const response = await fetchProfile(username);
      if (response) {
        setProfile(response);
      }
    };
    const getContestList = async (username: string) => {
      const response = await getContestsByUsername(username);
      if (response) {
        setContests(response);
      }
    };

    getProfile(username);
    getContestList(username);
  }, [match]);

  return (
    <Card className={classes.profileContainer}>
      <CardMedia className={classes.coverPhoto} image={profile?.coverPhoto} title="Cover Photo" />
      <Box textAlign="center" marginBottom={'1em'} justifyContent="center">
        <Avatar className={classes.profileImg} src={profile?.profilePicUrl} variant="circle" />
        <Typography component="h1" variant="h5" className={classes.name}>
          @{profile?.username}
        </Typography>
        <Typography component="p" className={classes.location}>
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
          <Button component={Link} to={`/messages`} variant="outlined" color="primary" className={classes.button}>
            Message
          </Button>
        ) : (
          <Button component={Link} to={`/profile`} variant="outlined" color="primary" className={classes.button}>
            Edit Profile
          </Button>
        )}
      </Box>
      <Box textAlign="center">
        <ProfileTabs contests={contests} />
      </Box>{' '}
    </Card>
  );
};

export default Profile;
