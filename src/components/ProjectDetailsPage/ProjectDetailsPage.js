import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Material-UI
import Container from '@material-ui/core/Container';
import {
  Box,
  Grid,
  Paper,
  Typography,
  ButtonGroup,
  Button,
  Fab,
  TextField,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vehicula ac ipsum eu lobortis. Pellentesque semper dolor justo, in accumsan felis pharetra sit amet. Nunc commodo sagittis odio, in venenatis lacus iaculis eu. In condimentum sed ex nec faucibus. Pellentesque eget velit ornare massa semper tempor. Donec hendrerit mi sit amet lacinia ultricies. Aliquam augue diam, rhoncus ut pulvinar eget, commodo ac ex.';

const ProjectDetails = (props) => {
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch({ type: 'GET_PROJECTS' });
  //   }, []);

  //   console.log(props.store.projects);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} sm={4}>
        <Box>
          <Paper elevation={3}>
            <img
              src="https://i.pinimg.com/564x/f0/5e/86/f05e865445d3a728165dd97234b76ab9.jpg"
              alt="it's some alt text"
            />
          </Paper>
        </Box>
      </Grid>

      <Grid item xs={6} sm={4}>
        <Typography variant="h5">Title and Description</Typography>
        <Typography variant="body1">{loremIpsum}</Typography>
      </Grid>
      <Grid item xs={6} sm={4}>
        <Typography variant="h5">Crew List</Typography>
      </Grid>
      <br></br>

      <Grid item xs={12} sm container>
        <Grid item sm={12}>
          <div className="row">
            <Typography variant="h5">Tasks</Typography>
            <Fab color="secondary">
              <AddIcon />
            </Fab>
            <ButtonGroup variant="contained" color="primary">
              <Button>Completed</Button>
              <Button>Incomplete</Button>
              <Button>Newest</Button>
              <Button>Oldest</Button>
            </ButtonGroup>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="h5">Notes</Typography>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          defaultValue="jot down a quick note!"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};
export default connect(mapStoreToProps)(ProjectDetails);
