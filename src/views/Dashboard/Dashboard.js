import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import API from '../../services'

import {
  TotalUsers,
  TotalPost,
  // TasksProgress,
  TotalNotification,
  TotalReport,
  LatestJoins,
  // UsersByDevice,
  LatestUsers,
  Rank,
  
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {

  const [summary, setSummary] = useState({})
  const classes = useStyles();
  
  useEffect(() => {

    const fetchSummary = async() => {
      
      let sum = await API.getSummary()
      setSummary(sum)
      
    }

    fetchSummary()

  }, [])

  console.log(summary);
  

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
        
          <TotalUsers user={summary.user} />
        
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >

          <TotalPost post={summary.post} />
        </Grid>

        {/* <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalNotification notification={summary.notification}/>
        </Grid> */}
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <TotalReport report={summary.report} />
          {/* <TotalProfit /> */}
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <LatestJoins acquisition={summary.acquisition} />
        </Grid>

        {/* <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestUsers newUser={summary.newUser} />
        </Grid> */}
        
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <Rank post={summary.top_post} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
