import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Components

import ProjectCard from '../ProjectCard/ProjectCard';
import PostCardDemo from '../ProjectCard/CoolerCard';
// --- Material-UI

import {
  Box,
  Grid,
  Button,
  ButtonGroup,
  CircularProgress,
} from '@material-ui/core';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const ProjectList = (props) => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState('id DESC');

  useEffect(() => {
    dispatch({ type: 'GET_PROJECTS' });
  }, []);

  const projects = props.store.projects.map((item, index) => {
    return (
      <Grid key={index} item md={4}>
        <ProjectCard
          title={item.title}
          description={item.description}
          image={item.image}
          isCompleted={item.is_completed}
          isStaffed={item.is_staffed}
          id={item.id}
        />
      </Grid>
    );
  });

  const changeSortOrder = (orderBy) => (event) => {
    setOrder(orderBy);
    console.log('CLICK order by: ', order);
  };

  return (
    <Box>
      {!props.store.projects[0] ? (
        <CircularProgress />
      ) : (
        <Box>
          <Box p={3} align="center">
            <ButtonGroup size="small" variant="contained" color="default">
              <Button onClick={changeSortOrder('is_completed ASC')}>
                Completed
              </Button>
              <Button onClick={changeSortOrder('is_completed DESC')}>
                Incomplete
              </Button>
              <Button onClick={changeSortOrder('time_created ASC')}>
                Newest
              </Button>
              <Button onClick={changeSortOrder('time_created DESC')}>
                Oldest
              </Button>
            </ButtonGroup>
          </Box>
          <Box align="center">
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
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default connect(mapStoreToProps)(ProjectList);
