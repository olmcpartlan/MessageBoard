import React, { useEffect } from 'react';
import { Button, Container } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router';


export default (props) => {


  let userId = window.sessionStorage.getItem("userId");
  let userName = window.sessionStorage.getItem("userName");


  useEffect(() => {
    // Get the userId from the url parameter.
    // /api/users/user/694000a0-b77c-4254-94e9-1fd274a54ac1
    console.log(`/api/users/user/${props.match.params.userId}`)
    fetch(`/api/users/user/${props.match.params.userId}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
  })
  

  return <Container
    maxWidth="lg"
    className="home-container"
  >
    <p>User</p>
    <p>{userName}</p>
  </Container>

}
