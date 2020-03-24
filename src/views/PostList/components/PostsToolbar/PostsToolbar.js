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
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const PostsToolbar = props => {
  const { className, onSearch, onDelete, onApprove,...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}></Button>
        <Button className={classes.exportButton}></Button>

      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="ค้นหาประกาศ"
          onChange={onSearch}
        />

        <span className={classes.spacer} />

        <Button
          className={classes.importButton}
          color=""
          variant="contained"
          onClick={onDelete}
        >

          ลบ
        </Button>
        <Button
          color=""
          variant="contained"
          onClick={onApprove}
        >
          อนุมัติ
        </Button>
      </div>
    </div>
  );
};

PostsToolbar.propTypes = {
  className: PropTypes.string
};

export default PostsToolbar;
