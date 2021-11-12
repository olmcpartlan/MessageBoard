import React from 'react';
import { Button, ButtonBase, Container, makeStyles } from '@material-ui/core';
import { FilterCenterFocusSharp } from '@material-ui/icons';
import PostForm from './PostForm';
import { useEffect } from 'react';
import { useState } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';


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

  let [allPosts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/posts")
      .then(res => res.json())
      .then(res => {
        setPosts(res);
        console.log(allPosts);
      })

  }, [])

  const classes = useStyles();

  return <Container
    maxWidth="lg"
  >
    <h3>Home</h3>
    <PostForm/>
    {allPosts.map((post, i) => {
      return <div key={i} className={classes.post}>
        {/* USER NAME */}
        <div className={classes.user}>
          <p onClick={(e) => userClickHandler(post.user, e)}><b>@{post.postedByName}</b></p>
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