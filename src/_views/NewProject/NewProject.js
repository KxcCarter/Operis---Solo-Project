import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Axios from 'axios';

// --- Material-UI
import { Grid, Paper, TextField, Button } from '@material-ui/core';

const NewProject = (props) => {
  const [projectDetails, setProjectDetails] = useState({
    title: '',
    description: '',
    image: '',
  });

  const history = useHistory();

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
  };

  return (
    <Grid container spacing={3}>
      <Grid item md={9}>
        <Paper>
          <TextField
            variant="filled"
            name="title"
            placeholder="Project Title"
            fullWidth
            value={projectDetails.title}
            onChange={handleChange('title')}
          />
        </Paper>
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

      <Grid item xs={6} sm={5}>
        <Paper>
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
        </Paper>
      </Grid>
    </Grid>
  );
};
export default connect(mapStoreToProps)(NewProject);
