import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Components

// --- Material-UI
import { Select, ListItem, ListItemText, Checkbox } from '@material-ui/core';

const CrewListItem = (props) => {
  const dispatch = useDispatch();

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
    <ListItem>
      <Checkbox
        size="small"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <ListItemText
        primary={props.crewList.role_name}
        secondary={
          props.crewList.name || (
            <Select
              native
              value={talentID}
              onChange={handleTalentAssign}
              inputProps={{
                name: 'role',
                id: 'filled-role-native-simple',
              }}
            >
              <option aria-label="None" value="" disabled>
                Assign To Role
              </option>

              {store.userTalentPool.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
          )
        }
      />
    </ListItem>
  );
};
export default connect(mapStoreToProps)(CrewListItem);
