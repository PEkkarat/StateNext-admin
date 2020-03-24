import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';
import API from '../../services'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [search, setSearch] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [maxSize, setMax] = useState(0)
  const [users, setUsers] = useState([])

  const pageProp = [page, setPage]
  const maxProp = [maxSize, setMax]
  const rowsProp = [rowsPerPage, setRowsPerPage]

  useEffect(() => {

    fetchData()

  },[rowsPerPage, page, search])

  const fetchData = async() => {
    let query = search ? `email=$reg=${search}.*` : undefined
    let res = await API.getUser(page + 1, rowsPerPage, query)

    let data = res.data
    setMax(data.total)
    let users = data.items.map((user) => {

      return {
        id: user._id,
        name: user.name || "-",
        email: user.email,
        phone: user.phone || "-",
        avatarUrl: user.photo || '/images/avatars/avatar_3.png',
        createdAt: new Date(user.createdAt).getTime(),
        status : 'ปกติ'
      }

    })

    setUsers(users)

  }

  const onSearch = ({target:{value}}) => {

    setSearch(value)

  }

  const onDelete = async() => {

    await Promise.all(selectedUsers.map((userId) => API.deleteUser(userId)))
    await fetchData()

  }

  return (
    <div className={classes.root}>
      <UsersToolbar onSearch={onSearch} onDelete={onDelete} />
      <div className={classes.content}>
        <UsersTable
          selectionUser={[selectedUsers, setSelectedUsers]}
          users={users}
          pageProp={pageProp}
          maxProp={maxProp}
          rowsProp={rowsProp}
        />
      </div>
    </div>
  );
};

export default UserList;
