import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Components

import ProjectCard from '../ProjectCard/ProjectCard';
// --- Material-UI
import Container from '@material-ui/core/Container';
import { Box, Grid, Paper } from '@material-ui/core';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_PROJECTS' });
  }, []);

  const projects = props.store.projects.map((item, index) => {
    return (
      <ProjectCard
        title={item.title}
        description={item.description}
        image={item.image}
        isCompleted={item.is_completed}
        isStaffed={item.is_staffed}
        key={item.id}
      />
    );
  });

  return (
    <Container>
      <Box>
        <Grid container spacing={3}>
          {projects}
        </Grid>
      </Box>
      <div>
        <h1 id="welcome">Welcome, {props.store.user.username}!</h1>
        <p>Your ID is: {props.store.user.id}</p>
        <LogOutButton className="log-in" />
      </div>
    </Container>
  );
};

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
