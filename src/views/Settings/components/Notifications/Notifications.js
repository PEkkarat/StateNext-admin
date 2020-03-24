import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button
} from '@material-ui/core';

import API from '../../../../services'

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Notifications = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [admins, setAdmins] = useState([])
  const [ form, setForm ] = useState({
    con:"",
    password:"",
    username:""
  })
  const [me, setMe] = useState({})

  const fetch = async() => {

    let res = await API.getAdmins()
    let me = await API.getMe()
    let admins = res.data
    setAdmins(admins)
    setMe(me)

  }

  useEffect(() => {

    fetch()

  }, [admins])

  const formChange = ({target:{value, name}}) => {

    setForm({
      ...form,
      [name]: value
    })

  }

  const clearForm = () => {

    let att_name = Object.keys(form)
    let newForm = {}

    att_name.map((name) => {
        newForm = {
          ...newForm,
          [name]:""
        }
    })

    setForm(att_name)

  }

  const createAdmin = async() => {

    if (!form.username || !form.password || !form.con) return
    if (form.password !== form.con) return

    await API.createAdmin(form.username, form.password)

    clearForm()
    fetch()

  }

  const deleteAdmin = async(id) => {

    await API.deleteAdmin(id)

  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="บริหารและดูแลสมาชิก admin"
          title="Administrator manager"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                gutterBottom
                variant="h6"
              >
                Administrators
              </Typography>
              
              {
                admins.map((admin) => {

                  return (
                    <List dense={true}>
                      <ListItem>
                        <ListItemText
                          primary={admin.username}
                        />
                        <ListItemSecondaryAction>
                          {
                            admin._id !== me._id &&
                            <IconButton onClick={() => deleteAdmin(admin._id)} edge="end" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          }
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  )

                })
              }

            </Grid>
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                gutterBottom
                variant="h6"
              >
                Create new Admin
              </Typography>
              <TextField
                fullWidth
                label="Username"
                name="username"
                onChange={formChange}
                type="text"
                value={form.username}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                style={{ marginTop: '1rem' }}
                onChange={formChange}
                type="password"
                value={form.password}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Confirm password"
                name="con"
                onChange={formChange}
                style={{ marginTop: '1rem' }}
                type="password"
                value={form.con}
                variant="outlined"
              />
              <Button
                color="primary"
                variant="outlined"
                style={{ marginTop: '1rem' }}
                onClick={createAdmin}
              >
                Create Admin
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </form>
    </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
