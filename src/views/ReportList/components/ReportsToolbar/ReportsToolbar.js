import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(3),
    minWidth: 120,
  },

}));

const ReportsToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [type, setType] = React.useState('all');
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    setType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>


      </div>

      <div className={classes.row}>

        <SearchInput
          className={classes.searchInput}
          placeholder="ค้นหาประกาศ"
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">เลือกประเภท</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={type}
            onChange={handleChange}
          >           
            <MenuItem value={"all"}>ทั้งหมด</MenuItem>
            <MenuItem value={"feedback"}>ให้ข้อเสนอแนะเกี่ยวกับผลิตภัณฑ์</MenuItem>
            <MenuItem value={"bug"}>รายงานบัก</MenuItem>
            <MenuItem value={"user"}>รายงานผู้ใช้</MenuItem>
            <MenuItem value={"post"}>รายงานเกี่ยวกับประกาศ</MenuItem>
          </Select>
        </FormControl>

        <span className={classes.spacer} />
        <Button
          color=""
          variant="contained"
        >
          ลบ
        </Button>

      </div>

    </div>
  );
};

ReportsToolbar.propTypes = {
  className: PropTypes.string
};

export default ReportsToolbar;
