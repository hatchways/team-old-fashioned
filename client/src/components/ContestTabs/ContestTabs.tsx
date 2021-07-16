import { Box, Paper, Tab, Tabs, Typography, withStyles } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import useStyles from './useStyles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

interface ContestProps {
  inProgress: string[];
  completed: string[];
}

// Display two tabs, the completed and the in progress contest
export default function ContestTabs(props: ContestProps): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Paper square className={classes.root}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="IN PROGRESS" />
        <Tab label="COMPLETED" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {/*TODO: In progress contests */}
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </TabPanel>

      <TabPanel value={value} index={1}>
        {/*TODO: Completed contests */}
        <ul>
          <li>Item 11</li>
          <li>Item 22</li>
        </ul>
      </TabPanel>
    </Paper>
  );
}
