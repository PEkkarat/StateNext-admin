import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {  makeStyles } from '@material-ui/styles';

import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';

import { getInitials } from 'helpers';
import SaveFile from './components/SaveFile';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  // avatar: {
  //   marginRight: theme.spacing(2)
  // },
  actions: {
    justifyContent: 'flex-end'
  },
  image: {
    height: 48,
    width: 48
  },

}));



const ReportsTable = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>เรื่องร้องเรียน</TableCell>
                  <TableCell></TableCell>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>ผู้ใช้</TableCell>
                  <TableCell>ตัวอย่างไฟล์</TableCell>
                  <TableCell>ดาวน์โหลดไฟล์</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(0, rowsPerPage).map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                    selected={selectedUsers.indexOf(user.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(user.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, user.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>{user.title}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{user.type}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Avatar
                        className={classes.image}
                        src={user.avatarUrl}
                        
                      >
                        {getInitials(user.name)}
                      </Avatar>
                      
                      {/* <List>
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
                              
                            />
                            
                          </ListItem>
                        ))}
                      </List> */}
                    </TableCell>
                    <TableCell>
                      <SaveFile />
                      
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

ReportsTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default ReportsTable;
