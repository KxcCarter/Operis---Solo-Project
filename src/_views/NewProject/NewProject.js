import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

// --- Material-UI
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';

// import TaskBox from '../../components/TaskBox/TaskBox';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import Axios from 'axios';

// const tempIMG =
// 'https://i.pinimg.com/564x/f0/5e/86/f05e865445d3a728165dd97234b76ab9.jpg';

const NewProject = (props) => {
  const [projectDetails, setProjectDetails] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [hasID, setHasID] = useState('not yet set.');
  const [wasCreated, setWasCreated] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleChange = (fieldKey) => (event) => {
    setProjectDetails({
      ...projectDetails,
      [fieldKey]: event.target.value,
    });
  };

  const handleSubmit = () => {
    Axios({
      method: 'POST',
      url: '/api/operis',
      data: projectDetails,
    })
      .then((response) => {
        Axios.get('/api/operis').then((response) => {
          console.log(response.data);
          history.push(
            `/projectDetails/${response.data[response.data.length - 1].id}`
          );
        });
      })
      .catch((err) => {
        console.log('POST error, ', err);
      });

    // dispatch({ type: 'CREATE_NEW_PROJECT', payload: projectDetails });
    // setWasCreated(true);
  };

  return (
    <Grid container spacing={3}>
      <Grid item md={9}>
        <TextField
          name="title"
          variant="outlined"
          placeholder="Project Title"
          fullWidth
          value={projectDetails.title}
          onChange={handleChange('title')}
        />
      </Grid>

      {projectDetails.title && (
        <Grid item sm={3}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleSubmit}
          >
            save
          </Button>
        </Grid>
      )}
      {/* <Grid item xs={6} sm={4}>
        <Paper elevation={5}>
          <Box m={0.7} p={0.3}>
            <img src={projectDetails.image} alt={projectDetails.title} />
          </Box>
        </Paper>
      </Grid> */}

      <Grid item xs={6} sm={4}>
        <Paper elevation={5}>
          <Box m={0.7} p={0.3}>
            <ImageUpload />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={6} sm={5}>
        <TextField
          name="description"
          variant="outlined"
          placeholder="Description"
          fullWidth
          multiline
          rows={10}
          value={projectDetails.description}
          onChange={handleChange('description')}
        />
      </Grid>

      {/* <Grid item xs={6} sm={3}>
        <Typography variant="h5">Crew List</Typography>
        <ul>
          <li>Lots</li>
          <li>Of</li>
          <li>Random</li>
          <li>People</li>
          <li>Here</li>
        </ul>
      </Grid> */}
      <br></br>

      {/* <TaskBox taskData={props.store} /> */}

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
export default connect(mapStoreToProps)(NewProject);
