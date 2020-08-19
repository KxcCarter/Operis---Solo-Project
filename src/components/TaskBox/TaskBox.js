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
  const [order, setOrder] = useState('id');
  const dispatch = useDispatch();

  const {
    store: { projectTasks },
  } = props;

  // TODO: make task list re-render upon state change.
  useEffect(() => {
    dispatch({
      type: 'GET_PROJECT_TASKS',
      payload: { projectID: props.pID, orderBy: order },
    });
  }, [order]);

  const changeSortOrder = (orderBy) => (event) => {
    setOrder(orderBy);
  };

  return (
    <>
      {projectTasks && (
        <Box m={2}>
          <Grid container>
            <Paper>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                {/* Taskbar Control Row */}
                <Box m={2} pt={1} display="inline">
                  <Grid item xs={12}>
                    <Box p={1} display="inline">
                      <Typography variant="h5" display="inline">
                        Tasks
                      </Typography>
                    </Box>
                    <Box p={1} display="inline">
                      <NewTaskModal />
                    </Box>

                    <ButtonGroup
                      size="small"
                      variant="contained"
                      color="primary"
                      display="inline"
                    >
                      <Button onClick={changeSortOrder('completed')}>
                        Completed
                      </Button>
                      <Button onClick={changeSortOrder('incomplete')}>
                        Incomplete
                      </Button>
                      <Button onClick={changeSortOrder('newest')}>
                        Newest
                      </Button>
                      <Button onClick={changeSortOrder('oldest')}>
                        Oldest
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Box>
              </Grid>
              <Box p={1}>
                {/* Task Items */}

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
          </Grid>
        </Box>
      )}
    </>
  );
}

export default connect(mapStoreToProps)(TaskBox);
