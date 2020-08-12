import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// --- Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { Typography, Button, Box, Grid, Paper } from '@material-ui/core';

// --- Icons
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

export default function TaskItem() {
  const loremIpsum =
    'Pellentesque eget velit ornare massa semper tempor. Donec hendrerit mi sit amet lacinia ultricies. Aliquam augue diam, rhoncus ut pulvinar eget, commodo ac ex.';

  const [taskState, setTaskState] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [taskData, setTaskData] = useState(loremIpsum);

  const handleOptions = (event) => {
    setTaskState(event.target.value);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleTaskData = (event) => {
    setTaskData(event.target.value);
  };

  return (
    <Box mt={2}>
      <Grid container spacing={1} justify="space-around">
        <Grid item md={1}>
          <Select
            native
            value={taskState}
            variant="standard"
            onChange={handleOptions}
          >
            <option aria-label="None" value="" />
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
            <option value="remove">Delete</option>
          </Select>
        </Grid>

        <Grid item md={10}>
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
                value={taskData}
                onChange={handleTaskData}
              />
            )}
          </Paper>
        </Grid>
        <Grid item md={1}>
          <Button size="small" variant="text" onClick={toggleEditMode}>
            {!editMode ? <EditIcon /> : <SaveAltIcon />}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
