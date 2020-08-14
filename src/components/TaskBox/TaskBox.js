import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import NewTaskModal from '../NewTaskModal/NewTaskModal';
import TaskItem from '../TaskItem/TaskItem';

// --- Material-UI
import {
  Box,
  Grid,
  Paper,
  Typography,
  ButtonGroup,
  Button,
  CircularProgress,
} from '@material-ui/core';

function TaskBox(props) {
  const [state, setState] = useState('Functional Component');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'GET_PROJECT_TASKS', payload: props.pID });
  }, []);

  const {
    store: { projectTasks },
  } = props;

  // console.table(projectDetails.tasks);
  // console.log(props.pID);

  const taskList = projectTasks.map((item, index) => {
    return <TaskItem key={index} id={item.id} taskContent={item.description} />;
  });

  return (
    <>
      {!projectTasks[0] && <CircularProgress />}
      {projectTasks && (
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
                  <NewTaskModal />
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
      )}
    </>
  );
}

export default connect(mapStoreToProps)(TaskBox);
