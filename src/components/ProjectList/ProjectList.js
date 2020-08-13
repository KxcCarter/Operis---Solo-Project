import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Components

import ProjectCard from '../ProjectCard/ProjectCard';
import PostCardDemo from '../ProjectCard/CoolerCard';
// --- Material-UI

import { Box, Grid, CircularProgress } from '@material-ui/core';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const ProjectList = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_PROJECTS' });
  }, []);

  const projects = props.store.projects.map((item, index) => {
    return (
      <Grid item md={4}>
        <ProjectCard
          title={item.title}
          description={item.description}
          image={item.image}
          isCompleted={item.is_completed}
          isStaffed={item.is_staffed}
          id={item.id}
          key={item.id}
        />
      </Grid>
    );
  });

  return (
    <Box>
      {!props.store.projects[0] ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {projects}
          <Grid item md={4}>
            <PostCardDemo />
          </Grid>
          <Grid item md={4}>
            <PostCardDemo />
          </Grid>
          <Grid item md={4}>
            <PostCardDemo />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
export default connect(mapStoreToProps)(ProjectList);
