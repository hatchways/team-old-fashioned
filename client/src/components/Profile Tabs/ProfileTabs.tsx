// Adapted from https://material-ui.com/components/tabs/

import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './useStyles';
import { ContestAPIData } from '../../interface/Contest';
import { ContestList } from './ContestListByUsername/ContestList';

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
      {value === index && <Box p={3}>{children}</Box>}
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
  contests: ContestAPIData[];
}
export default function ProfileTabs({ contests }: Props): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
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
          aria-label="user information"
        >
          <Tab label="Portfolio" {...a11yProps(0)} />
          <Tab label="Active Contests" {...a11yProps(1)} />
          <Tab label="Ratings" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.panel}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          Show portfolio here (image + caption). Image clickable to zoom.
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ContestList contests={contests} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Show ratings as artist and contest owner here.
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
