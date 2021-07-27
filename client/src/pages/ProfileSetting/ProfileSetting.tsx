import React from 'react';
import useStyles from './useStyles';
import { AppBar, Box, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import PersonalInformationForm from './PersonalInformationForm/PersonalInformationForm';
import { Link } from 'react-router-dom';
import PaymentsPage from '../../components/Payments/PaymentsPage';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default function ProfileSetting() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container className={classes.root}>
      {/* <AuthHeader linkTo="/messages" asideText="testing upload file page" btnText="open uploadFile page" /> */}
      <Box className={classes.tabContainer}>
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
      <Box className={classes.payments}>
        <TabPanel value={value} index={0}>
          Profile
        </TabPanel>
        <TabPanel value={value} index={1}>
          {value == 1 && <PersonalInformationForm />}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PaymentsPage />
        </TabPanel>
        <TabPanel value={value} index={3}>
          Notifications
        </TabPanel>
        <TabPanel value={value} index={4}>
          Password
        </TabPanel>
      </Box>
    </Grid>
  );
}
