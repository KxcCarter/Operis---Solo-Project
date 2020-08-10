import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

// --- Material-UI
import Container from '@material-ui/core/Container';
import { Box, Grid, Paper } from '@material-ui/core';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = (props) => (
  <Container>
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Paper>Things go here!</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>Things go here!</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>Things go here!</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>Things go here!</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>Things go here!</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>Things go here!</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>Things go here!</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>Things go here!</Paper>
        </Grid>
      </Grid>
    </Box>
    <div>
      <h1 id="welcome">Welcome, {props.store.user.username}!</h1>
      <p>Your ID is: {props.store.user.id}</p>
      <LogOutButton className="log-in" />
    </div>
  </Container>
);

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
