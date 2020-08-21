import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// --- Components

import ProjectCard from '../ProjectCard/ProjectCard';
// import PostCardDemo from '../ProjectCard/CoolerCard';
// --- Material-UI

import {
  Box,
  Grid,
  Button,
  ButtonGroup,
  CircularProgress,
} from '@material-ui/core';

const ProjectList = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_PROJECTS' });
  }, [dispatch]);

  const projects = props.store.projects.map((item, index) => {
    return (
      <Grid key={index} item xs={12} sm={6} md={4}>
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

  // const projectsDouble = props.store.projects.map((item, index) => {
  //   return (
  //     <Grid key={index} item xs={12} sm={6} md={4}>
  //       <PostCardDemo
  //         title={item.title}
  //         description={item.description}
  //         image={item.image}
  //         isCompleted={item.is_completed}
  //         isStaffed={item.is_staffed}
  //         id={item.id}
  //       />
  //     </Grid>
  //   );
  // });

  const changeSortOrder = (orderBy) => (event) => {
    console.log('CLICK order by: ', orderBy);
    dispatch({ type: 'GET_PROJECTS_ORDERED', payload: orderBy });
  };

  return (
    <Box>
      {!props.store.projects[0] ? (
        <CircularProgress />
      ) : (
        <Box>
          <Box p={3} align="center">
            <ButtonGroup size="small" variant="contained" color="default">
              <Button onClick={changeSortOrder('is_completed')}>
                Completed
              </Button>
              <Button onClick={changeSortOrder('title')}>title</Button>
              <Button onClick={changeSortOrder('time_created')}>Newest</Button>
              <Button onClick={changeSortOrder('oldest')}>Oldest</Button>
            </ButtonGroup>
          </Box>
          <Box align="center">
            <Grid container spacing={3}>
              {projects}
              {/* {projectsDouble} */}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default connect(mapStoreToProps)(ProjectList);
