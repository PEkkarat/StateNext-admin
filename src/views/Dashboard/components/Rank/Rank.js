import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import uuid from 'uuid/v1';

import mockData from './data';
import { StatusBullet } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  อนุมัติ: 'success',
  รออนุมัติ : 'info',
  ไม่อนุมัติ : 'danger'
};

const Rank = props => {
  let { className, post, ...rest } = props;

  const classes = useStyles();

  post = post || []
  let orders = post.map((p, index) => {

    return {
        id: uuid(),
        ref: `${index + 1}`,
        customer: {
          name: p.title
        },
        createdAt: new Date(p.createdAt).getTime(),
        status: p.status
    }

  })

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        // action={
        //   <Button
        //     color="primary"
        //     size="small"
        //     variant="outlined"
        //   >
        //     refresh
        //   </Button>
        // }
        title="3 อับดับที่มีการเข้าชมสูงสุด"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>อันดับที่</TableCell>
                  <TableCell>ประกาศ</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        วันที่ลงประกาศ
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>สถานะ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>{order.ref}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>
                      {moment(order.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[order.status]}
                          size="sm"
                        />
                        {order.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          {/* View all <ArrowRightIcon /> */}
        </Button>
      </CardActions>
    </Card>
  );
};

Rank.propTypes = {
  className: PropTypes.string
};

export default Rank;