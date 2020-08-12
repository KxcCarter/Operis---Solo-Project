import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Material-UI
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  CircularProgress,
  Button,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import TaskBox from '../../components/TaskBox/TaskBox';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const ProjectDetails = (props) => {
  const { match } = props;
  const {
    store: { projectDetails },
  } = props;

  const id = match.params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_PROJECT_DETAILS', payload: id });
  }, []);

  console.table(projectDetails);

  return (
    <>
      {!projectDetails.title && <CircularProgress />}
      {projectDetails.title && (
        <Grid container spacing={3}>
          <Grid item sm={2}>
            <Button variant="contained" startIcon={<ArrowBackIcon />}></Button>
          </Grid>
          <Grid item md={9}>
            <Typography variant="h4" align="center">
              {projectDetails.title}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper elevation={5}>
              <Box m={0.7} p={0.3}>
                <img src={projectDetails.image} alt={projectDetails.title} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={5}>
            <Typography variant="body1">
              {projectDetails.description}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5">Crew List</Typography>

            <ul>
              {projectDetails.talent.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
          </Grid>
          <br></br>

          <TaskBox taskData={projectDetails.tasks} />

          {/* Notes Widget Container */}
          <Grid item xs={12} sm={3}>
            <Paper elevation={3}>
              <Box m={0.5} p={0.5} pb={1.5}>
                <Box mb={3} pt={1}>
                  <Typography variant="h6">Notes</Typography>
                </Box>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={8}
                  defaultValue="jot down a quick note!"
                  variant="outlined"
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default connect(mapStoreToProps)(ProjectDetails);
