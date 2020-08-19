import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { Typography } from '@material-ui/core';

class LandingPage extends Component {
  state = {
    heading: 'Operis - Project Managment App',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        <h2>{this.state.heading}</h2>

        <div className="grid">
          <div className="grid-col grid-col_8">
            <Typography variant="h6">
              Operis is a project managment application geared toward
              filmmakers.
            </Typography>
            <br></br>
            <Typography variant="body1">
              Users can create projects starting with something as simple as
              just a title. From there they can add more details to their
              project, such as a description, notes, and even a custom image
              from either their computer or from the web.
            </Typography>
            <br></br>
            <Typography variant="body1">
              Each project can be assigned project roles, such as director,
              writer, or producer. Users can then assign people to those roles
              by searching through their talent pool. Users can also add people
              to their talent pool via the Talent Pool page.
            </Typography>
            <br></br>
            <Typography variant="body1">
              Projects can also have tasks associated with them, which the user
              can edit, mark as complete, or delete (NOT BUILT YET).
            </Typography>
          </div>
          <div className="grid-col grid-col_4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={this.onLogin}>
                Login
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
