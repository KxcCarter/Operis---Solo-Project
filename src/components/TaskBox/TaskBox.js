import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// --- Material-UI
import {
  Box,
  Grid,
  Paper,
  Typography,
  ButtonGroup,
  Button,
  Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TaskItem from '../TaskItem/TaskItem';

function TaskBox(props) {
  const [state, setState] = useState('Functional Component');

  console.table(props.taskData);

  const taskList = props.taskData.map((item, index) => {
    return <TaskItem key={index} taskContent={item} />;
  });

  const handleAddTask = () => {
    console.log('We bout to add a new one!');
  };

  return (
    <Box m={2}>
      <Paper>
        {/* Taskbar Control Row */}
        <Grid item sm={12}>
          <Box align="center" m={2} pt={1}>
            <Box p={1} display="inline">
              <Typography variant="h5" display="inline">
                Tasks
              </Typography>
            </Box>
            <Box p={1} display="inline">
              <Fab size="small" color="secondary" onClick={handleAddTask}>
                <AddIcon />
              </Fab>
            </Box>
            <Box p={1} display="inline">
              <ButtonGroup size="small" variant="contained" color="primary">
                <Button>Completed</Button>
                <Button>Incomplete</Button>
                <Button>Newest</Button>
                <Button>Oldest</Button>
              </ButtonGroup>
            </Box>
          </Box>
        </Grid>
        <Box p={1}>
          {/* Task Items */}
          {taskList}
        </Box>
      </Paper>
    </Box>
  );
}

export default connect(mapStoreToProps)(TaskBox);
