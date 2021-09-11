import React, { useState } from 'react';
import { TextField, makeStyles, Button, InputLabel } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}));

const submitForm = (e, userName, email, pass) => {
  e.preventDefault();
  console.log(userName)
  console.log(email)
  console.log(pass)
}

const handleEmailChange = (e, setEmail) => {
  setEmail(e.target.value);
}
const handleUserNameChange = (e, setUserName) => {
  setUserName(e.target.value);
}
const handlePasswordChange = (e, setPassword) => {
  setPassword(e.target.value);
}
const handleConfirmPasswordChange = (e, pass, setConfPass, setPassMatches) => {
  if(e.target.value === pass) setPassMatches(true)
  else setPassMatches(false)
  // e.target.value === pass ? setPassMatches(true) : setPassMatches(false);
  setConfPass(e.target.value);
}

export default (props) => {
  const classes = useStyles(props);

  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");
  let [confPass, setConfPass] = useState("");
  let [passMatches, setPassMatches] = useState(false);

  // TODO: Fix tab indexes.
  return (
    <div className={classes.root}>
      <form onSubmit={(e) => submitForm(e, userName, email, pass)}>
        <Grid container justifyContent="space-evenly">
          {/* LEFT COLUMN */}
          <Grid
            container
            spacing={3}
            xs={6}
            direction="column"
            justifyContent="space-evenly"
            alignItems="flex-end"
          >
            {/* USERNAME */}
            <Grid item xs={6} >
              <TextField
                label="UserName"
                onChange={(e) => handleUserNameChange(e, setUserName)}
                required={true}
              />
            </Grid>
            <Grid item xs={6}>
              {/* PASSWORD */}
              <TextField
                label="Password"
                onChange={(e) => handlePasswordChange(e, setPass)}
                required={true}
              />
            </Grid>
          </Grid>
          {/* RIGHT COLUMN */}
          <Grid
            container
            spacing={3}
            xs={6}
            direction="column"
            justifyContent="space-evenly"
          >
            <Grid item xs={6}>
              {/* EMAIL */}
              <TextField
                onChange={(e) => handleEmailChange(e, setEmail)}
                label="Email"
                required={true}
              />
            </Grid>
            <Grid item xs={6}>
              {/* CONFIRM PASSWORD */}
              <TextField
                label="Confirm Password"
                error={passMatches}
                helperText={passMatches && "passwords must match"}
                onChange={(e) => handleConfirmPasswordChange(e, pass, setConfPass, setPassMatches)}
                required={true}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Button type="submit" color="primary">submit</Button>
            </Grid>
          </Grid>
        </Grid>

      </form>

    </div>
  )

}