import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Components
import CrewListItem from '../CrewListItem/CrewListItem';

// --- Material-UI
import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Select,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from '@material-ui/core';

const CrewList = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'GET_CREW_LIST', payload: props.pID });
    dispatch({ type: 'GET_ROLES' });
    dispatch({ type: 'GET_USER_TALENT', payload: props.user.id });
  }, []);

  const [roleID, setRoleID] = useState('');
  const [talentID, setTalentID] = useState('');
  const [checked, setChecked] = useState(false);

  const { store } = props;

  const handleChangeSelect = (event) => {
    dispatch({
      type: 'ADD_PROJECT_ROLE',
      payload: { id: props.pID, roleID: parseInt(event.target.value) },
    });
  };

  const handleTalentAssign = (event) => {
    console.log('You just assigned a person to a crew role! Wow!');
  };

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">Project Crew</Typography>
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
                  <option aria-label="None" value="" disabled>
                    Add a Crew Role
                  </option>

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
                  return <CrewListItem key={index} crewList={item} />;
                })}
            </List>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
export default connect(mapStoreToProps)(CrewList);
