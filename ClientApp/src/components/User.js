import React, { Component } from 'react';
import { Button, Container } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router';



export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      posts: []
    }
  }

  userId = window.sessionStorage.getItem("userId");
  userName = window.sessionStorage.getItem("userName");
  componentDidMount() {
    fetch(`/api/users/user/${this.props.match.params.userId}`)
      .then(res => res.json())
      .then(res => {
        let postObjects = res.posts.map((post, i) => {
          return(
            <p>{post.body}</p>
          )
        })
        console.log(res);
        this.setState({
          user: res,
          posts: postObjects
        })
      })
  }

  render() {
    return (
      <Container
        maxWidth="lg"
        className="home-container"
      >
        <p>User: {this.userName}</p>
        {this.state.posts}
      </Container>
    )
  }
}



/*
export default (props) => {


  let userId = window.sessionStorage.getItem("userId");
  let userName = window.sessionStorage.getItem("userName");

  const [user, setUser] = useState({});
  let posts = [];

  useEffect(() => {
    // Get the userId from the url parameter.
    // /api/users/user/694000a0-b77c-4254-94e9-1fd274a54ac1
    // console.log(`/api/users/user/${props.match.params.userId}`)
    fetch(`/api/users/user/${props.match.params.userId}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setUser(res);
        posts = res.posts.map((post, i) => {
          return (
            <p>{post.body}</p>
          );
        })
      })

  }, [])



  return

}


*/