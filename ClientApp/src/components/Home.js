import React from 'react';
import { Button, ButtonBase, Container, makeStyles } from '@material-ui/core';
import { FilterCenterFocusSharp } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  post: {
    border: '1px solid purple',
  },
  user: { },
  comment: {
    marginLeft: '3%',
    color: 'blue'
  }
}))


const userClickHandler = (user, e) => {
  // This will route to the User profile page.
  console.log()
}

// This could open a new dialog window with the entire post.
const openComments = (postId, e) => {
  console.log(postId);
}


const Home = (props) => {
  const classes = useStyles();
  let posts = [
    { 'postId': '12123', 'user': 'michael', 'body': 'i am beyonce always' }, 
    // { 'postId': '32132', 'user': 'kevin', 'body': 'sometimes i run, i\'m a runner' }
  ]

  return <Container
    maxWidth="lg"
  >
    <h3>Home</h3>
    {posts.map((post, i) => {
      return <div key={i} className={classes.post}>
        {/* USER NAME */}
        <div className={classes.user}>
          <p onClick={(e) => userClickHandler(post.user, e)}><b>@{post.user}</b></p>
        </div>
        {/* POST BODY */}
        <div className='post-body'>
          <p>{post.body}</p>
          <div className={classes.comment}>
            <p onClick={(e) => openComments(post.postId)}>1 Comment ...</p>
          </div>
        </div>

      </div>
    })}
    
  </Container>


}

export default Home;