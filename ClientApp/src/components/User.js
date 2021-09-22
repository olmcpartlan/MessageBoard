import React from 'react';
import { Button, Container } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router';


export default (props) => {


  // Actaul user id.
  console.log(props.match.params.userId);


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
