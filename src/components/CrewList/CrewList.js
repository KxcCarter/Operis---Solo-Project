import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Components

import ProjectCard from '../ProjectCard/ProjectCard';
import PostCardDemo from '../ProjectCard/CoolerCard';
// --- Material-UI

import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Select,
} from '@material-ui/core';

const CrewList = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'GET_CREW_LIST', payload: props.pID });
    dispatch({ type: 'GET_ROLES' });
  }, []);

  const [roleID, setRoleID] = useState('');

  const { store } = props;

  const handleChangeSelect = (event) => {
    setRoleID(event.target.value);
    console.log('role id: ', event.target.value);
    dispatch({
      type: 'ADD_PROJECT_ROLE',
      payload: { id: props.pID, roleID: parseInt(event.target.value) },
    });
  };

  return (
    <Box>
      {!store.projectCrewList[0] ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          <Typography variant="h5">Crew List</Typography>

          <ul>
            {store.projectCrewList.map((item, index) => {
              return (
                <li key={index}>
                  {item.role_name}: {item.name || 'Unassigned'}
                </li>
              );
            })}
            <li>
              <Select
                native
                value={roleID}
                onChange={handleChangeSelect}
                inputProps={{
                  name: 'role',
                  id: 'filled-role-native-simple',
                }}
              >
                <option aria-label="None" value="" />

                {store.roles.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.role_name}
                    </option>
                  );
                })}
              </Select>
            </li>
          </ul>
        </Grid>
      )}
    </Box>
  );
};
export default connect(mapStoreToProps)(CrewList);
