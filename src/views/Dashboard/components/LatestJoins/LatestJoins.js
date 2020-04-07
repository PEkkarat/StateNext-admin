import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import palette from 'theme/palette';
import moment from 'moment'

import { options } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestJoins = props => {
  const { className, acquisition, ...rest } = props;

  let labels = []
  let currentWeek = []
  let prevWeek = []
  let prevDay = [5, 4, 3, 2, 1, 0]

  const findDay = (targetDay) => {

    if (!acquisition) return 0

    if (acquisition.length > 0) {

      let monthlyaccess = acquisition[0].monthlyaccess
      monthlyaccess = monthlyaccess.filter((ma) => ma.month == targetDay.format("M"))

      if (monthlyaccess.length < 1) return 0

      let dailyusage = monthlyaccess[0].dailyusage
      dailyusage = dailyusage.filter((daily) => daily.day == targetDay.format("D"))

      if (dailyusage.length < 1) return 0

      let count = dailyusage[0].count
      return count

    }

    return 0

  }

  prevDay.map((day) => {
    let targetDay = moment().subtract(day, 'days')
    let prevDay = moment().subtract(day + 6, 'days')
    labels.push(targetDay.format("D MMM"))

    let currentJoin = findDay(targetDay)
    let prevJoin = findDay(prevDay)

    currentWeek.push(currentJoin)
    prevWeek.push(prevJoin)

  })

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'สัปดาห์นี้',
        backgroundColor: palette.icon,
        data: currentWeek
      },
      {
        label: 'สัปดาห์ที่แล้ว',
        backgroundColor: palette.neutral,
        data: prevWeek
      }
    ]
  };

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            size="small"
            variant="text"
          >
            7 วันที่ผ่านมา
          </Button>
        }
        title="การเข้าร่วมแพลตฟอร์ม"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={data}
            options={options}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          {/* Overview <ArrowRightIcon /> */}
        </Button>
      </CardActions>
    </Card>
  );
};

LatestJoins.propTypes = {
  className: PropTypes.string
};

export default LatestJoins;
