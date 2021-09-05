import React, { useState } from 'react';
// import { browserHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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

const setUser = (e, setUserName, userName) => {
  setUserName("asdfasdfasdf");
  console.log(userName);

}

const goToProfile = (userName) => {
  // browserHistory.push(`/profile/${userName}`)
  window.history.replaceState(null, userName, `/profile/${userName}`)
}

export default function ButtonAppBar() {
  const classes = useStyles();
  let [userName, setUserName] = useState("");


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
            ? <Button onClick={(e) => setUser(e, setUserName, userName)} color="inherit">Login</Button>
            : <Button onClick={(e) => goToProfile(userName)} color="inherit">{userName}</Button>

          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
