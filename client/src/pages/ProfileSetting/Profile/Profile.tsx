import { FC, useState } from 'react';
import { useAuth } from '../../../context/useAuthContext';
import ContestItem from '../../../components/ContestItem/ContestItem';
import { Button, Grid, Box, Tabs, Tab, Avatar, Typography } from '@material-ui/core';
import demoProfilePhoto from '../../../Images/demo-profile-photo.png';
import mockContestPic from '../../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png';
import useStyles from './useStyles';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const mockContests = [
  {
    imgSrc: mockContestPic,
    imgCount: 25,
    headline: 'Lion tattoo concept in minimal style',
    byline: 'Looking for a cool simple ideas',
    prizeAmt: 150,
  },
  {
    imgSrc: mockContestPic,
    imgCount: 9,
    headline: 'Anchors, like all the pirates',
    byline: 'Artistic anchors or anchor related art',
    prizeAmt: 75,
  },
];

const Profile: FC = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container direction="column" className={classes.profileContainer}>
      <Grid xs={12} md={10} item className={classes.avatarContainer}>
        <Box textAlign="center">
          <Avatar className={classes.profileImg} src={demoProfilePhoto} alt="Profile Photo" />
          <Typography className={classes.name}>Kenneth Stewart</Typography>
          <Button size="large" variant="contained" color="primary" className={classes.btn}>
            Edit profile
          </Button>
        </Box>
      </Grid>
      <Grid xs={12} md={10} item className={classes.tabsContainer}>
        <Box textAlign="center">
          <Tabs
            value={value}
            variant="fullWidth"
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="IN PROGRESS" />
            <Tab label="COMPLETED" />
          </Tabs>
          <TabPanel value={value} index={0}>
            {mockContests.map((contest, index) => (
              <ContestItem
                key={`activeContest-${index}`}
                imgSrc={contest.imgSrc}
                imgCount={contest.imgCount}
                headline={contest.headline}
                byline={contest.byline}
                prizeAmt={contest.prizeAmt}
              />
            ))}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {mockContests.map((contest, index) => (
              <ContestItem
                key={`activeContest-${index}`}
                imgSrc={contest.imgSrc}
                imgCount={contest.imgCount}
                headline={contest.headline}
                byline={contest.byline}
                prizeAmt={contest.prizeAmt}
                completed
              />
            ))}
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
