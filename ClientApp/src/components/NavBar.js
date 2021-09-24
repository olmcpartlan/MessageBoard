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
import { validateLocaleAndSetLanguage } from 'typescript';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'red'
  },
  title: {
    flexGrow: 1,
  },
}));


const goToProfile = (userId, props) => {
  props.history.push(`/profile/${userId}`)
}

export default (props) => {
  const classes = useStyles();
  let [userName, setUsername] = useState("");
  let [pass, setPass] = useState("");
  let [email, setEmail] = useState("");
  let [loginValidation, setLoginValidation] = useState(false);

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

    // The user can login with their email or username.
    let fieldName = userName.includes("@") ? "Email" : "UserName";

    let body = JSON.stringify({
      [fieldName]: userName,
      "Password": pass
    });

    console.log(body);

    fetch("/api/users/login",
      {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: body
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(res["userName"] === undefined || res["email"] === undefined) {
          setLoginValidation(true);
        }
        else {
          setLoginValidation(false);
          handleClose();
          window.sessionStorage.setItem("userName", res["userName"])
          window.sessionStorage.setItem('userId', res["userId"])
          props.history.push(`/profile/${res["userId"]}`)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const goHome = () => {
    props.history.push("/")
  }

  const goToRegister = () => {
    handleClose();
    props.history.push("/register")
  }

  const handleEmailChanged = (e, setEmail) => {
    setEmail(e.target.value);
  }

  const handlePassChange = (e, setPass) => {
    setPass(e.target.value);
  }


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  let sessionUserName = window.sessionStorage.getItem("userName")

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
          {sessionUserName === null
            // LOGIN BUTTON
            ? <Button
              color="inherit"
              onClick={handlePopover}
            >
              Login
            </Button>
            // USER PROFILE BUTTON
            : <Button
              onClick={(e) => goToProfile(sessionUserName, props)}
            >
              {sessionUserName}
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
                {/* USERNAME / EMAIL */}
                <Grid item>
                  <TextField
                    label="UserName"
                    variant="filled"
                    size="small"
                    error={loginValidation}
                    helperText={loginValidation && "Login information was not found."}
                    required={true}
                    onChange={(e) => handleEmailChanged(e, setUsername)}
                  />
                </Grid>
                <Grid item>
                  {/* PASSWORD */}
                  <TextField
                    label="Password"
                    variant="filled"
                    size="small"
                    required={true}
                    onChange={(e) => handlePassChange(e, setPass)}
                  />
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
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
