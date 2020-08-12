import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Material-UI
import { Box, Grid, Paper, Typography, TextField } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import TaskItem from '../TaskItem/TaskItem';
import TaskBox from '../TaskBox/TaskBox';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vehicula ac ipsum eu lobortis. Pellentesque semper dolor justo, in accumsan felis pharetra sit amet. Nunc commodo sagittis odio, in venenatis lacus iaculis eu. In condimentum sed ex nec faucibus. Pellentesque eget velit ornare massa semper tempor. Donec hendrerit mi sit amet lacinia ultricies. Aliquam augue diam, rhoncus ut pulvinar eget, commodo ac ex.';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const ProjectDetails = (props) => {
  const {
    match: { params },
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_PROJECT_DETAILS', payload: params.id });
  }, []);

  console.log('Loging props.store:', props.store);

  return (
    <Grid container spacing={3}>
      <Grid item md={9}>
        <Typography variant="h4" align="center">
          blaaa
        </Typography>
      </Grid>
      <Grid item xs={6} sm={4}>
        <Paper elevation={5}>
          <Box m={0.7} p={0.3}>
            <img
              src="https://i.pinimg.com/564x/f0/5e/86/f05e865445d3a728165dd97234b76ab9.jpg"
              alt="He's Gonzo..."
            />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={6} sm={5}>
        <Typography variant="body1">{loremIpsum}</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="h5">Crew List</Typography>
        <ul>
          <li>Lots</li>
          <li>Of</li>
          <li>Random</li>
          <li>People</li>
          <li>Here</li>
        </ul>
      </Grid>
      <br></br>

      <TaskBox taskData={props.store} />

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
  );
};
export default connect(mapStoreToProps)(ProjectDetails);
