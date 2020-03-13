import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import mockData from './data';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestUsers = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [avatars] = useState(mockData);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${avatars.length} in total`}
        title="ผู้ใช้ใหม่"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {avatars.map((avatar, i) => (
            <ListItem
              divider={i < avatars.length - 1}
              key={avatar.id}
            >
              <ListItemAvatar>
                <img
                  alt="Avatar"
                  className={classes.image}
                  src={avatar.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={avatar.name}
                secondary={`Updated ${avatar.updatedAt.fromNow()}`}
              />
              <IconButton
                edge="end"
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          ดูทั้งหมด <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestUsers.propTypes = {
  className: PropTypes.string
};

export default LatestUsers;
