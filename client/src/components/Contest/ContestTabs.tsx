import { Box, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react';

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

// Display two tabs, the completed and the in progress contests
export default function ContestTabs(): JSX.Element {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Paper>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="In PROGRESS" />
        <Tab label="COMPLETED" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {/*TODO: In progress contests */}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {/*TODO: Completed contests */}
      </TabPanel>
    </Paper>
  );
}
