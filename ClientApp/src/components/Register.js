import React, { useState } from 'react';
import { TextField, makeStyles, Button, InputLabel, Paper, FormControl } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { FilterCenterFocusSharp } from '@material-ui/icons';




const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
  },

}));

const submitRequiredForm = (e, userName, email, pass, confPass, setRequiredFormVisible, setUserFields) => {
  e.preventDefault();
  // Form is showing an invalid field, but submit is called anyway. 
  // This is a temporary fix.
  if(confPass === pass)
  {
    // Create the object to be sent to the server.
    let userFields = JSON.stringify({
      "UserName": userName,
      "Email": email,
      "Password": pass
    })

    let requestSettings = {
      method: "POST",
      body: userFields,
      headers: {
        "content-type": "application/json"
      }
    }

    fetch("/api/users/register", requestSettings)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        // After a successful response from the server,
        // Add the new user object to state.
        setUserFields(res);
      })
      .then(res => {
        window.sessionStorage.setItem('userId', res["userId"])
        setRequiredFormVisible()
      })
      .catch(err => console.log(err))
  }
}


const submitOptionalForm = (e, firstName, lastName, userId, props) => {
  e.preventDefault();
  // No need to send the request if the user did not fill out the field(s).
  if(firstName === "" && lastName === "") {
    props.history.push(`/profile/${userId}`)
  }
  else {
    fetch("/api/users/optional", {
      method: "POST",
      body: JSON.stringify({
        "UserId": userId,
        "FirstName": firstName,
        "LastName": lastName
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        props.history.push(`/profile/${userId}`);
      })

  }



}

const handleEmailChange = (e, setEmail) => setEmail(e.target.value);
const handleUserNameChange = (e, setUserName) => setUserName(e.target.value);
const handlePasswordChange = (e, setPassword) => setPassword(e.target.value);


const handleConfirmPasswordChange = (e, pass, setConfPass, setPassMatches) => {
  if (e.target.value === pass) setPassMatches(true)
  else setPassMatches(false)
  // e.target.value === pass ? setPassMatches(true) : setPassMatches(false);
  setConfPass(e.target.value);
}

export default (props) => {

  let [showRequiredForm, setShowRequiredForm] = useState(true);

  // need to pass the setter into both forms.
  // .. but how
  let [user, setUser] = useState({
    "userId": "",
    "userName": "",
    "password": "",
    "email": "",
    "firstName": "",
    "lastName": "",
    "posts": [],
    "createdAt": "",
    "updatedAt": "",
  })

  const classes = useStyles(props);
  return (
    <Grid container>
      <Grid container xs={6}>
        {showRequiredForm
          ? <RequiredForm setVisible={setShowRequiredForm} setUserFields={setUser} />
          : <OptionalForm history={props.history} userName={user['userName']} userId={user['userId']}/>

        }
      </Grid>
      <Grid item xs={6}>

        <Button onClick={() => console.log(user['userId'])} color="inherit">props</Button>
        <Paper className={classes.paper}>
          could just do some kind of filler text here.<br />
          could be some kind of description of the application?<br />
          and/or some slick animation
        </Paper>
      </Grid>
    </Grid>

  )
}



const RequiredForm = (props) => {
  const classes = useStyles(props);

  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");
  let [confPass, setConfPass] = useState("");
  let [passMatches, setPassMatches] = useState(true);


  return (
      <Grid item xs={12}>
        <form onSubmit={(e) => submitRequiredForm(e, userName, email, pass, confPass, props.setVisible, props.setUserFields)}>
        <Paper className={classes.paper}>
          {/* USERNAME */}
          <Grid item >
            <TextField
              label="User Name"
              onChange={(e) => handleUserNameChange(e, setUserName)}
              required={true}
            />
          </Grid>
          <Grid item>
            {/* EMAIL */}
            <TextField
              onChange={(e) => handleEmailChange(e, setEmail)}
              label="Email"
              required={true}
            />
          </Grid>
          <Grid item>
            {/* PASSWORD */}
            <TextField
              label="Password"
              onChange={(e) => handlePasswordChange(e, setPass)}
              required={true}
            />
          </Grid>

          <Grid item>
            {/* CONFIRM PASSWORD */}
            <TextField
              label="Confirm Password"
              error={pass.length !== 0 && !passMatches}
              helperText={!passMatches && "passwords must match"}
              onChange={(e) => handleConfirmPasswordChange(e, pass, setConfPass, setPassMatches)}
              required={true}
            />
          </Grid>
          <Grid container justifyContent="center">
            {/* SUBMIT */}
            <Grid item>
              <Button type="submit" color="primary">submit</Button>
            </Grid>
          </Grid>

        </Paper>
      </form>

    </Grid>

  )
}


const handleFirstNameChange = (e, setFirstName) => {
  setFirstName(e.target.value);
}

const handleLastNameChange = (e, setLastName) => {
  setLastName(e.target.value);

}

// TODO: Image Uploading
/*
const handleUploadImageChange = (e, setImage) => {
  const formData = new FormData();
  formData.append('file', e.target.files[0]);
  console.log(formData);

  fetch("/api/users/upload")
}
*/

const OptionalForm = (props) => {
  const classes = useStyles(props);

  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  // let [imageUrl, setImageUrl] = useState("");
  let [pass, setPass] = useState("");

  return (
    <Grid item xs={12}>
      <form onSubmit={(e) => submitOptionalForm(e, userName, email, props.userId, props)}>
        <Paper className={classes.paper}>
          <label>Hello, {props.userName}!</label>
          <label>To create a personalized experience, please fill out these remaining fields.</label>
          <label>If you would like to skip, click submit.</label>
          {/* USERNAME */}
          <Grid item>
            <TextField
              label="FirstName"
              onChange={(e) => handleFirstNameChange(e, setUserName)}
            />
          </Grid>
          <Grid item>
            {/* EMAIL */}
            <TextField
              label="LastName"
              onChange={(e) => handleLastNameChange(e, setEmail)}
            />
          </Grid>
          {/* <Grid item>
            <Button
            Button
            variant="contained"
            component="label"
            >
              Upload File
              <input
                type="file"
                onChange={(e) => handleUploadImageChange(e, setImageUrl)}
                hidden
              />
            </Button>
          </Grid> */}
          <Grid container justifyContent="center">
            <Grid item>
              <Button type="submit" color="primary">submit</Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </Grid>



  )

}