import React, {useEffect} from 'react';
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
  const classes = useStyles();
  
  useEffect(() => {

    const fetchSummary = async() => {
      
      console.log(await API.getSummary());
      
    }

    fetchSummary()

  })

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
        
          <TotalUsers />
        
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >

          <TotalPost />
        </Grid>

        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalNotification/>
          {/* <TasksProgress /> */}
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalReport/>
          {/* <TotalProfit /> */}
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestJoins />
        </Grid>
        {/* <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid> */}
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestUsers />
        </Grid>
        
        <Grid
          item
          lg={12}
          md={12}
          xl={9}
          xs={12}
        >
          <Rank />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
