import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// --- Material-UI

import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { Typography, Button, Box, Grid, Paper } from '@material-ui/core';

// --- Icons
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

function TaskItem(props) {
  const [taskState, setTaskState] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [taskData, setTaskData] = useState(props.taskContent);
  const dispatch = useDispatch();

  const handleOptions = (event) => {
    setTaskState(event.target.value);
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
      payload: { task: taskData, id: props.id },
    });
    toggleEditMode();
  };

  return (
    <Box mt={2}>
      <Grid container>
        <Grid item sm={2}>
          <Select
            native
            value={taskState}
            variant="standard"
            onChange={handleOptions}
          >
            <option aria-label="None" value="" disabled>
              options
            </option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
            <option value="remove">Delete</option>
          </Select>
        </Grid>

        <Grid item sm={9}>
          <Paper elevation={2}>
            {!editMode ? (
              <Box m={1}>
                <Typography variant="body1">{taskData}</Typography>
              </Box>
            ) : (
              <TextField
                style={{ margin: 8 }}
                placeholder="New Task"
                fullWidth
                multiline
                rows={4}
                defaultValue={taskData}
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
        </Grid>
      </Grid>
    </Box>
  );
}

export default connect(mapStoreToProps)(TaskItem);
