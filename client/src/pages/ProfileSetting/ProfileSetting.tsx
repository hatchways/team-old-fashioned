import React, { FC } from 'react';
import useStyles from './useStyles';
import { Box, Tab, Tabs } from '@material-ui/core';
import PersonalInformationForm from './PersonalInformationForm/PersonalInformationForm';
import Profile from './Profile/Profile';
import PaymentDetails from './PaymentDetails/PaymentDetails';

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
      style={{ width: '100vw' }}
    >
      {value === index && <Box p={3}>{children}</Box>}
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

  return (
    <Box className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="standard"
        value={value}
        onChange={handleChange}
        aria-label="Profile Settings"
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
        {value === 0 && <Profile />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value === 1 && <PersonalInformationForm />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {value === 2 && <PaymentDetails />}
      </TabPanel>
      <TabPanel value={value} index={3}>
        Notifications
      </TabPanel>
      <TabPanel value={value} index={4}>
        Password Change
      </TabPanel>
    </Box>
  );
};

export default ProfileSetting;
