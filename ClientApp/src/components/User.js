import React from 'react';
import { Button, Container } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router';


export default (props) => {

  // Use this to call the initial "onLoad" event to the db.
  let params = props.match.params.userName;

  let match = useRouteMatch("/");

  return <Container
    maxWidth="lg"
    className="home-container"
  >
    <p>User</p>
    <Button
      color="primary"
      onClick={() => props.history.push("/")}
    >
      Button
    </Button>
  </Container>

}
