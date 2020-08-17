import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

// ---
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// --- Pages
import AboutPage from '../../_views/AboutPage/AboutPage';
import UserPage from '../../_views/UserPage/UserPage';
import InfoPage from '../../_views/InfoPage/InfoPage';
import LandingPage from '../../_views/LandingPage/LandingPage';
import LoginPage from '../../_views/LoginPage/LoginPage';
import RegisterPage from '../../_views/RegisterPage/RegisterPage';
import ProjectDetails from '../../_views/ProjectDetailsPage/ProjectDetailsPage';
import ProjectList from '../ProjectList/ProjectList';
import NewProject from '../../_views/NewProject/NewProject';
import TalentPoolPage from '../../_views/TalentPoolPage/TalentPoolPage';

import './App.css';
import { Container } from '@material-ui/core';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <Container maxWidth="lg">
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route exact path="/about" component={AboutPage} />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute exact path="/admin" component={UserPage} />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute exact path="/info" component={InfoPage} />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will be redirected to the authRedirect path provided. */}
            <ProtectedRoute
              exact
              path="/login"
              authRedirect="/admin"
              component={LoginPage}
            />
            <ProtectedRoute
              exact
              path="/registration"
              authRedirect="/admin"
              component={RegisterPage}
            />
            <ProtectedRoute
              exact
              path="/home"
              authRedirect="/admin"
              component={LandingPage}
            />
            <ProtectedRoute exact path="/talent" component={TalentPoolPage} />
            <ProtectedRoute
              exact
              path="/projectDetails/:id"
              component={ProjectDetails}
            />
            <ProtectedRoute exact path="/projects" component={ProjectList} />
            <ProtectedRoute exact path="/new" component={NewProject} />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </Container>
      </Router>
    );
  }
}

export default connect()(App);
