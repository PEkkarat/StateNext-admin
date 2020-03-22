import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },

  button: {
    marginRight: theme.spacing(1),
  },

  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const NotificationsToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />

      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="ค้นหาประกาศ"
        />

        <span className={classes.spacer} />
        <Button
          className={classes.button}
          color="red"
          variant="contained"
        >
          ลบ
        </Button>
        <Button
          color="primary"
          variant="contained"
        >
          ล้างการแจ้งเตือน
        </Button>
      </div>
    </div>
  );
};

NotificationsToolbar.propTypes = {
  className: PropTypes.string
};

export default NotificationsToolbar;
