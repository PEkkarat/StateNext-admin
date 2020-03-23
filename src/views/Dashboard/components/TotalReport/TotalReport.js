import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ReportIcon from '@material-ui/icons/Report';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.icon,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const TotalReport = props => {
  const { className, report, ...rest } = props;

  const classes = useStyles();
  const count = report ? report.count : 0

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              เรื่องร้องเรียน
            </Typography>
            <Typography variant="h3">{count}</Typography>
          </Grid>

          <Grid item>
            <Avatar className={classes.avatar}>
              <ReportIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>

        {/* <div className={classes.difference}>
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            จากเดือนที่แล้ว
          </Typography>
        </div> */}
      </CardContent>
    </Card>
  );
};

TotalReport.propTypes = {
  className: PropTypes.string
};

export default TotalReport;
