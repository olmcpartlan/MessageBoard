import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import User from './components/User';
import Register from './components/Register'
import UserProfile from './components/User';


import './custom.css'
import NavBar from './components/NavBar';
import { Container } from '@material-ui/core';

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Layout>
        <Route component={NavBar}/>
        <Container>
          <Route exact path='/' component={Home} />
          <Route exact path='/profile/:userName' component={User} />
          <Route exact path='/register' component={Register} />
        </Container>
      </Layout>
    );
  }
}
