import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton,  Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: 'white',
    boxShadow: '1'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar >
      <Hidden lgUp>
          <IconButton
            color="4f4f4f"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
          
        </Hidden>
        <RouterLink to="/">
          {/* <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          /> */}

          <Typography
            variant="h5"
          >
            StateNext Adminitration
          </Typography>

        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>

          <RouterLink to="/sign-in">
            <IconButton
              className={classes.accountButton}
              color="4F4F4F"
            >
             <AccountCircleIcon />
            </IconButton>
          </RouterLink>

        </Hidden>

        
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
