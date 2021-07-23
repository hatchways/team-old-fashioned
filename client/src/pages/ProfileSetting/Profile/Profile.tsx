import { FC, useState, useEffect } from 'react';
import ContestItem from '../../../components/ContestItem/ContestItem';
import { Button, Grid, Box, Tabs, Tab, Avatar, Typography, Container } from '@material-ui/core';
import demoProfilePhoto from '../../../Images/demo-profile-photo.png';
import { getUserContests } from '../../../helpers/APICalls/contest';
import { ContestAPIData } from '../../../interface/Contest';

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
        <Container>
          <Box p={3}>{children}</Box>
        </Container>
      )}
    </div>
  );
};

const Profile: FC = (): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [contests, setContests] = useState<ContestAPIData[]>([]);

  useEffect(() => {
    const getContests = async () => {
      const response = await getUserContests();
      if (response.success) {
        if (response.contests) {
          setContests(response.contests);
        }
      }
    };
    getContests();
  }, [setContests]);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  const openContests = [];
  const closedContests = [];
  for (const contest of contests) {
    let firstImgSrc;
    let imageCnt = 0;
    for (let i = 0; i < contest.subs.length; i++) {
      if (contest.subs[i].files.length > 0) {
        if (!firstImgSrc) {
          firstImgSrc = contest.subs[i].files[0];
        }
        imageCnt += contest.subs[i].files.length;
      }
    }
    if (new Date(contest.deadline) > new Date()) {
      openContests.push(
        <ContestItem
          key={`activeContest-${contest._id}`}
          imgSrc={firstImgSrc || demoProfilePhoto}
          imgCount={imageCnt}
          headline={contest.title}
          deadline={contest.deadline}
          byline={contest.description}
          prizeAmt={contest.prizeAmount}
        />,
      );
    } else {
      closedContests.push(
        <ContestItem
          key={`activeContest-${contest._id}`}
          imgSrc={firstImgSrc || demoProfilePhoto}
          imgCount={imageCnt}
          headline={contest.title}
          deadline={contest.deadline}
          byline={contest.description}
          prizeAmt={contest.prizeAmount}
          completed
        />,
      );
    }
  }

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
            {openContests.length > 0 ? openContests : <div key="1">No contests to display</div>}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {closedContests.length > 0 ? closedContests : <div key="1">No contests to display</div>}
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
