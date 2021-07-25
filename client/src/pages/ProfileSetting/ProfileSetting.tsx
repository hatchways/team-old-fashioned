import React, { FC } from 'react';
import useStyles from './useStyles';
import { AppBar, Box, Grid, Tab, Tabs, Container } from '@material-ui/core';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import PersonalInformationForm from './PersonalInformationForm/PersonalInformationForm';
import Profile from './Profile/Profile';
import { Link } from 'react-router-dom';
import { classExpression } from '@babel/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-settings-tabs-${index}`}
      aria-labelledby={`profile-settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ width: '100%', backgroundColor: 'blue' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-settings-tab-${index}`,
    'aria-controls': `profile-settings-tabs-${index}`,
  };
}

const ProfileSetting: FC = (): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };
  console.log('render');

  return (
    <Grid container className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="standard"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        indicatorColor="primary"
      >
        <Tab label="Profile" {...a11yProps(0)} />
        <Tab label="Personal Information" {...a11yProps(1)} />
        <Tab label="Payment Details" {...a11yProps(2)} />
        <Tab label="Notifications" {...a11yProps(3)} />
        <Tab label="Password" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {value == 0 && <Profile />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value == 1 && <PersonalInformationForm />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Payment Details
      </TabPanel>
      <TabPanel value={value} index={3}>
        Notifications
      </TabPanel>
      <TabPanel value={value} index={4}>
        Password Change
      </TabPanel>
    </Grid>
  );
};

{
  /* <Box className={classes.tabContainer}>
        <AppBar position="static" color="secondary" className={classes.tabDisplay}>
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={handleChange}
            orientation="vertical"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Personal Information" {...a11yProps(1)} />
            <Tab label="Payment details" {...a11yProps(2)} />
            <Tab label="Notifications" {...a11yProps(3)} />
            <Tab label="Password" {...a11yProps(4)} />
          </Tabs>
        </AppBar>
      </Box>
      <TabPanel value={value} index={0}>
        Profile
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value == 1 && <PersonalInformationForm />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Payment details
      </TabPanel>
      <TabPanel value={value} index={3}>
        Notifications
      </TabPanel>
      <TabPanel value={value} index={4}>
        Password
      </TabPanel> */
}

export default ProfileSetting;
