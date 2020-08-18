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
  Typography,
  Select,
  List,
  ListItem,
} from '@material-ui/core';

const CrewList = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'GET_CREW_LIST', payload: props.pID });
    dispatch({ type: 'GET_ROLES' });
    dispatch({ type: 'GET_USER_TALENT' });
  }, []);

  const [roleID, setRoleID] = useState('');
  const [talentID, setTalentID] = useState('');

  const { store } = props;

  const handleAddCrewRole = (event) => {
    dispatch({
      type: 'ADD_PROJECT_ROLE',
      payload: { id: props.pID, roleID: parseInt(event.target.value) },
    });
  };

  const handleTalentAssign = (crewID) => (event) => {
    setTalentID(event.target.value);
    console.log(event.target.value, crewID);
    dispatch({
      type: 'ADD_TALENT_TO_ROLE',
      payload: {
        id: parseInt(crewID),
        talentID: parseInt(event.target.value),
        pID: props.pID,
      },
    });
  };

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">Project Crew</Typography>
          <div>
            <List dense>
              {/* Dropdown List */}

              <ListItem>
                <Select
                  native
                  value={roleID}
                  onChange={handleAddCrewRole}
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

              {/* Rendered Crew List */}

              {store.projectCrewList[0] &&
                store.projectCrewList.map((item, index) => {
                  return (
                    <CrewListItem
                      key={index}
                      crewList={item}
                      talent={talentID}
                      addTalent={handleTalentAssign}
                    />
                  );
                })}
            </List>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
export default connect(mapStoreToProps)(CrewList);
