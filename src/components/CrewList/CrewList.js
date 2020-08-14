import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Components

// --- Material-UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Select,
  List,
  ListItem,
  ListItemText,
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
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Project Crew</Typography>
            <div>
              <List dense>
                <ListItem>
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
                </ListItem>
                {store.projectCrewList[0] &&
                  store.projectCrewList.map((item, index) => {
                    return (
                      <ListItem key={index}>
                        <ListItemText
                          primary={item.role_name}
                          secondary={item.name || 'Unassigned'}
                        />
                      </ListItem>
                    );
                  })}
              </List>
            </div>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
export default connect(mapStoreToProps)(CrewList);
