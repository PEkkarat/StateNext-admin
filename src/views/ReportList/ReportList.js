import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { PostsToolbar as ReportsToolbar, PostsTable as ReportsTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ReportList = () => {
  const classes = useStyles();
  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <ReportsToolbar />
      <div className={classes.content}>
        <ReportsTable users={users} />
      </div>
    </div>
  );
};

export default ReportList;
