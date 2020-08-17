import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
import CrewList from '../../components/CrewList/CrewList';
import TaskBox from '../../components/TaskBox/TaskBox';
import ImageUpload from '../../components/ImageUpload/ImageUpload';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
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

  // ***
  // TODO: Componentize note section
  const [note, setNote] = useState(projectDetails.notes);
  const [editMode, setEditMode] = useState(false);
  const [details, setDetails] = useState({
    title: projectDetails.title,
    description: projectDetails.description,
    image: projectDetails.image,
    id: projectDetails.id,
  });

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
    console.log('changing this! ', details);
  };

  const saveDetails = () => {
    dispatch({ type: 'UPDATE_PROJECT_DETAILS', payload: details });
    toggleEditMode();
  };

  return (
    <>
      {!projectDetails.id && <CircularProgress />}
      {projectDetails.id == match.params.id && (
        <Grid container spacing={3}>
          <Grid item sm={2}>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={clickBack}
            ></Button>
          </Grid>
          <Grid item md={8}>
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
          <Grid item sm={1}>
            <Button
              variant="text"
              size="small"
              onClick={!editMode ? toggleEditMode : saveDetails}
            >
              {editMode ? 'save' : 'edit'}
            </Button>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper elevation={5}>
              <Box m={0.7} p={0.3}>
                {projectDetails.image ? (
                  <img src={projectDetails.image} alt={projectDetails.title} />
                ) : (
                  <ImageUpload />
                )}
                {editMode && (
                  <>
                    <Typography variant="subtitle1">Add a new image</Typography>
                    <ImageUpload pID={projectDetails.id} />
                  </>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={5}>
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
          <Grid item xs={6} sm={3}>
            <CrewList pID={projectDetails.id} />
          </Grid>
          <br></br>

          {/* Task Box */}
          <Grid item sm={9}>
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
