import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Material-UI
import Container from '@material-ui/core/Container';
import { Box, Grid, Paper, Typography } from '@material-ui/core';

const ProjectCard = (props) => {
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch({ type: 'GET_PROJECTS' });
  //   }, []);

  //   console.log(props.store.projects);

  return (
    <Grid item xs={6} sm={3}>
      <div className="clickableContainer">
        <Box>
          <Paper elevation={3}>
            <Typography variant="h4">{props.title}</Typography>
            <Typography variant="body1">{props.description}</Typography>
            <img src={props.image} alt="THIS IS ALT TEXT! WOW!"></img>
            <Typography variant="subtitle1">{props.isCompleted}</Typography>
          </Paper>
        </Box>
      </div>
    </Grid>
  );
};
export default connect(mapStoreToProps)(ProjectCard);
