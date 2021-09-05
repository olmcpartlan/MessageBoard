import React, { useState } from 'react';
// import { browserHistory } from 'react-router';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container, Grid, Input, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const goToProfile = (userName, props) => {
  props.history.push(`/profile/${userName}`)
}

export default (props) => {
  const classes = useStyles();
  let [userName, setUserName] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
          { userName === ""
            // LOGIN BUTTON
            ? <Button 
                color="inherit" 
                onClick={handlePopover}
              >
                Login
              </Button>
            // USER PROFILE BUTTON
            : <Button 
            onClick={(e) => goToProfile(userName, props)} 
          >
            {userName}
          </Button>

          }

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Grid container >
              {/* LOGIN FORM */}
              <form>
                <Grid item>
                  <TextField label="UserName" variant="filled" size="small" />
                </Grid>
                <Grid item>
                  <TextField label="Password" variant="filled" size="small" />
                </Grid>

                <Grid item>
                  <Button variant="contained" color="success">Login</Button>
                  <label><b>OR </b></label>
                  <Button variant="contained" color="success">Register</Button>
                </Grid>

              </form>
            </Grid>

          </Popover>
        </Toolbar>
      </AppBar>
    </div>
  );
}
