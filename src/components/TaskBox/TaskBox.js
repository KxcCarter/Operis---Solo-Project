import React, { useState, useEffect, memo } from 'react';
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
  const [order, setOrder] = useState('id');
  const dispatch = useDispatch();

  const {
    store: { projectTasks },
  } = props;

  // TODO: make task list re-render upon state change.
  useEffect(() => {
    dispatch({
      type: 'GET_PROJECT_TASKS',
      payload: { id: props.pID, orderBy: order },
    });
    console.log('IN USEEFFECT: ', order);
  }, [order]);

  const changeSortOrder = (orderBy) => (event) => {
    setOrder(orderBy);
    console.log('CLICK order by: ', order);
  };

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
                  <Typography variant="h6" display="inline">
                    Sort
                  </Typography>
                </Box>
                <Box p={1} display="inline">
                  <ButtonGroup size="small" variant="contained" color="primary">
                    <Button onClick={changeSortOrder('is_completed')}>
                      Completed
                    </Button>
                    <Button onClick={changeSortOrder('is_completed')}>
                      Incomplete
                    </Button>
                    <Button onClick={changeSortOrder('time_created')}>
                      Newest
                    </Button>
                    <Button onClick={changeSortOrder('time_created')}>
                      Oldest
                    </Button>
                  </ButtonGroup>
                </Box>
              </Box>
            </Grid>
            <Box p={1}>
              {/* Task Items */}
              {/* {taskList} */}
              {projectTasks.map((item, index) => {
                return (
                  <TaskItem
                    key={index}
                    id={item.id}
                    projectID={props.pID}
                    taskContent={item.description}
                    status={item.is_completed}
                  />
                );
              })}
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
}

export default connect(mapStoreToProps)(TaskBox);
