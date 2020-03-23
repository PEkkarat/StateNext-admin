import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

const TotalUsers = props => {
  let { className, user , ...rest } = props;

  user = user || {}
  const numberUser = user.max || 0
  const monthlyCount = user.count || 0
  const diff = user.diff || 0
  const percent = monthlyCount > 0 ? diff / monthlyCount * 100 : 0

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
      color:  percent >= 0 ? theme.palette.success.dark : theme.palette.error.dark
    },
    differenceValue: {
      color: theme.palette.success.dark,
      marginRight: theme.spacing(1)
    }
  }));

  const classes = useStyles();

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
              จำนวนผู้ใช้
            </Typography>
            <Typography variant="h3">{numberUser}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          {
            percent >= 0 ?
            <ArrowUpwardIcon className={classes.differenceIcon} />
            :
            <ArrowDownwardIcon className={classes.differenceIcon} />
          }
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            {percent}%
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            จากเดือนที่แล้ว
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalUsers.propTypes = {
  className: PropTypes.string
};

export default TotalUsers;
