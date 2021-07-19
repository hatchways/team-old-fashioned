// Adapted from https://material-ui.com/components/tabs/

import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from './useStyles';
import { useTheme } from '@material-ui/core/styles';
import { SubmissionsGrid, submissionCount } from './SubmissionsList';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

interface Props {
  submissionList: Array<{ img: string; username: string }>;
  description: string;
}

export default function FullWidthTabs({ submissionList, description }: Props): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const count = submissionCount({ submissionList });
  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={'Designs ' + '(' + count + ')'} {...a11yProps(0)} />
          <Tab label="Brief" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{ backgroundColor: '#ffffff' }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <SubmissionsGrid submissionList={submissionList} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {description}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
