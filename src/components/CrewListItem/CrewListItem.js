import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Components

// --- Material-UI
import {
  Select,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from '@material-ui/core';

const CrewListItem = (props) => {
  const dispatch = useDispatch();

  const [talentID, setTalentID] = useState('');
  const [talentName, setTalentName] = useState(props.crewList.name);
  const [checked, setChecked] = useState(false);

  const { store } = props;

  const handleChecked = () => {
    setChecked(!checked);
    console.log(props);
  };

  const handleTalentAssign = (event) => {
    setTalentID(event.target.value);
    dispatch({
      type: 'ADD_TALENT_TO_ROLE',
      payload: {
        id: props.crewList.id,
        talentID: parseInt(event.target.value),
        pID: props.crewList.project_id,
      },
    });
  };

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox size="small" checked={checked} onChange={handleChecked} />
      </ListItemIcon>
      <ListItemText
        primary={props.crewList.role_name}
        secondary={
          talentName || (
            <Select
              native
              value={talentID}
              // onChange={props.addTalent(props.crewList.id)}
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
