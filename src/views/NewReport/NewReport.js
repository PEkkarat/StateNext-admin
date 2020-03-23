import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid,Typography ,Card } from '@material-ui/core';

import {  NewReportDetails , SelectTypeReport  } from './components';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    marginTop : theme.spacing(4),
  }
}));

const NewReport = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
            variant="h1"

          >
            เราทำงานเป็นอย่างไรบ้าง
      </Typography>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
        </Grid>

        <Grid
          item
          md={12}
          xs={12}
        >
          <Card>
            <SelectTypeReport/>
          </Card>
        </Grid>

        <Grid
          item
          md={12}
          xs={12}
          
        >
         <NewReportDetails />
        </Grid>
       
      </Grid>
    </div>
  );
};

export default NewReport;
