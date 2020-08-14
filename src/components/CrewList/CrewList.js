import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Components

import ProjectCard from '../ProjectCard/ProjectCard';
import PostCardDemo from '../ProjectCard/CoolerCard';
// --- Material-UI

import { Box, Grid, CircularProgress, Typography } from '@material-ui/core';

const CrewList = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'GET_CREW_LIST', payload: { id: props.pID } });
  }, []);

  const { store } = props;

  return (
    <Box>
      {!props.store.projects[0] ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          <Typography variant="h5">Crew List</Typography>

          <ul>
            {store.crewProjectList.map((item, index) => {
              return (
                <li key={index}>
                  {item.role_name}: {item.name}
                </li>
              );
            })}
          </ul>
        </Grid>
      )}
    </Box>
  );
};
export default connect(mapStoreToProps)(CrewList);
