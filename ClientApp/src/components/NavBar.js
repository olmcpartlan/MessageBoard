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
import { Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  let [userName, setUsername] = useState("");
  let [pass, setPass] = useState("");
  let [email, setEmail] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  // SEND THE INPUT FIELDS TO THE SERVER
  const submitForm = e => {
    e.preventDefault();
    fetch("/api/users/login",
      {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "UserName": userName,
          "Password": pass
        })
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const goHome = () => {
    props.history.push("/")
  }

  const goToRegister = () => {
    props.history.push("/register")
  }


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={goHome}>
            Home
          </Typography>
          {userName === ""
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
              <form onSubmit={submitForm}>
                <Grid item>
                  <TextField
                    label="Email"
                    variant="filled"
                    size="small"
                  // onChange={handleEmailChanged}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Password"
                    variant="filled"
                    size="small"
                  // onChange={handlePassChange}
                  />
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    Login
                  </Button>
                  <label> OR </label>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={goToRegister}
                  >
                    Register
                  </Button>
                </Grid>

              </form>
            </Grid>

          </Popover>
        </Toolbar>
      </AppBar>
    </div>
  );
}
