import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles } from '@material-ui/core/styles';

// --- Material-UI

import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { Typography, Button, Box, Grid, Paper } from '@material-ui/core';

// --- Icons
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import UndoIcon from '@material-ui/icons/Undo';

const useStyles = makeStyles((theme) => ({
  danger: {
    color: theme.palette.error.dark,
  },
  complete: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.contrastText,
    opacity: '55%',
  },
  incomplete: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    opacity: '55%',
  },
}));

function TaskItem(props) {
  const [editMode, setEditMode] = useState(false);
  const [taskData, setTaskData] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOptions = (event) => {
    if (event.target.value === 'remove') {
      dispatch({
        type: 'DELETE_TASK',
        payload: { taskID: props.id, projectID: props.projectID },
      });
      return;
    }

    dispatch({
      type: 'UPDATE_TASK_STATUS',
      payload: {
        status: event.target.value,
        taskID: props.id,
        projectID: props.projectID,
      },
    });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (event) => {
    setTaskData(event.target.value);
  };

  const handleSave = () => {
    console.log(props);
    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        task: taskData || props.taskContent,
        taskID: props.id,
        projectID: props.projectID,
      },
    });
    toggleEditMode();
  };

  return (
    <Box mt={2} pb={1}>
      <Grid container>
        <Grid item sm={2}>
          <Select
            native
            value={props.status}
            variant="standard"
            onChange={handleOptions}
          >
            <option aria-label="None" value="" disabled>
              options
            </option>
            <option value="true">Complete</option>
            <option value="false">Incomplete</option>
            <option value="remove">Delete</option>
          </Select>
        </Grid>

        <Grid item sm={9}>
          <Paper
            elevation={2}
            className={props.status ? classes.complete : classes.incomplete}
          >
            {!editMode ? (
              <Box m={1}>
                <Typography variant="body1">{props.taskContent}</Typography>
              </Box>
            ) : (
              <TextField
                style={{ margin: 8 }}
                placeholder="New Task"
                fullWidth
                multiline
                rows={4}
                defaultValue={props.taskContent}
                onChange={handleChange}
              />
            )}
          </Paper>
        </Grid>
        <Grid item sm={1}>
          <Button
            size="small"
            variant="text"
            onClick={!editMode ? toggleEditMode : handleSave}
          >
            {!editMode ? <EditIcon /> : <SaveAltIcon />}
          </Button>
          {editMode && (
            <Button size="small" variant="text" onClick={toggleEditMode}>
              <UndoIcon />
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default connect(mapStoreToProps)(TaskItem);
