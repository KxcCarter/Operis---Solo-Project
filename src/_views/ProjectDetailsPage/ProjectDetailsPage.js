import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import CrewList from '../../components/CrewList/CrewList';
import TaskBox from '../../components/TaskBox/TaskBox';

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

// --- MUI Icons ---
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteProjectButton from '../../components/DeleteProjectButton/DeleteProjectButton';

const ProjectDetails = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { match } = props;
  const {
    store: { projectDetails },
  } = props;

  // GET project details on render
  useEffect(() => {
    dispatch({ type: 'GET_PROJECT_DETAILS', payload: match.params.id });
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [details, setDetails] = useState({
    title: '',
    description: '',
    image: '',
  });
  // ***
  // TODO: Componentize note section
  const [note, setNote] = useState(projectDetails.notes);

  const clickBack = () => {
    // history.goBack();
    history.push('/projects');
  };

  const handleNote = (event) => {
    setNote(event.target.value);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const saveNote = () => {
    dispatch({
      type: 'UPDATE_NOTE',
      payload: { note: note, id: projectDetails.id },
    });
  };

  const handleChange = (fieldKey) => (event) => {
    setDetails({
      ...details,
      [fieldKey]: event.target.value,
    });
  };

  const saveDetails = () => {
    dispatch({
      type: 'UPDATE_PROJECT_DETAILS',
      payload: {
        title: details.title || projectDetails.title,
        description: details.description || projectDetails.description,
        image: details.image || projectDetails.image,
        id: match.params.id,
      },
    });
    toggleEditMode();
  };

  return (
    <>
      {!projectDetails.id && <CircularProgress />}
      {projectDetails.id == match.params.id && (
        <Grid container spacing={2}>
          {/* Project Title and Details */}

          <Grid item xs={1} sm={2}>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={clickBack}
            ></Button>
          </Grid>
          <Grid item xs={12} md={8}>
            {!editMode ? (
              <Typography variant="h3" align="center">
                {projectDetails.title}
              </Typography>
            ) : (
              <TextField
                variant="outlined"
                fullWidth
                defaultValue={projectDetails.title}
                onChange={handleChange('title')}
              ></TextField>
            )}
          </Grid>
          <Grid item xs={2} container>
            <Grid item xs={6}>
              <Button
                variant="text"
                size="small"
                onClick={!editMode ? toggleEditMode : saveDetails}
              >
                {editMode ? 'save' : 'edit'}
              </Button>
              {editMode && (
                <Button variant="text" size="small" onClick={toggleEditMode}>
                  cancel
                </Button>
              )}
            </Grid>
            {editMode && (
              <Grid item xs={6}>
                <DeleteProjectButton projectID={projectDetails.id} />
              </Grid>
            )}
          </Grid>

          {/* Project Image */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={5}>
              <Box m={0.7} p={0.3}>
                {projectDetails.image ? (
                  <img src={projectDetails.image} alt={projectDetails.title} />
                ) : (
                  <ImageUpload pID={projectDetails.id} />
                )}
                {editMode && (
                  <>
                    <Typography variant="subtitle1">Add a new image</Typography>
                    <ImageUpload pID={projectDetails.id} />
                    <Typography variant="subtitle1">
                      Use image from web
                    </Typography>
                    <TextField
                      size="small"
                      variant="outlined"
                      fullWidth
                      defaultValue={projectDetails.image}
                      onChange={handleChange('image')}
                    ></TextField>
                  </>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            {!editMode ? (
              <Typography variant="body1">
                {projectDetails.description}
              </Typography>
            ) : (
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={10}
                defaultValue={projectDetails.description}
                onChange={handleChange('description')}
              ></TextField>
            )}
          </Grid>

          {/* Roles and Talent */}
          <Grid item xs={12} sm={6} md={3}>
            <CrewList pID={projectDetails.id} />
          </Grid>
          <br></br>

          {/* Task Box */}
          <Grid item xs={12} sm={9}>
            <TaskBox pID={projectDetails.id} />
          </Grid>

          {/* Notes Widget Container */}
          <Grid item xs={12} sm={3}>
            <Paper elevation={3}>
              <Box m={0.5} p={0.5} pb={1.5}>
                <Box m={1}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="h6">Notes</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={saveNote}
                      >
                        save
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  fullWidth
                  rows={8}
                  defaultValue={projectDetails.notes}
                  variant="outlined"
                  onChange={handleNote}
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
