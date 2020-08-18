import React, { useState } from 'react';
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
import SearchAddRoleTalent from '../SearchAddRoleTalent/SearchAddRoleTalent';

const CrewListItem = (props) => {
  const dispatch = useDispatch();

  const [talentID, setTalentID] = useState('');
  const [checked, setChecked] = useState(false);

  const { store } = props;

  const handleChecked = () => {
    setChecked(!checked);
    console.log(props);
  };

  const handleTalentAssign = (talent) => (event) => {
    setTalentID(event.target.value);
    dispatch({
      type: 'ADD_TALENT_TO_ROLE',
      payload: {
        id: props.crewList.id,
        // talentID: parseInt(event.target.value),
        talentID: parseInt(talent),
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
          props.crewList.name || (
            // <Select
            //   native
            //   value={talentID}
            //   onChange={handleTalentAssign}
            //   inputProps={{
            //     name: 'role',
            //     id: 'filled-role-native-simple',
            //   }}
            // >
            //   <option aria-label="None" value="" disabled>
            //     Assign To Role
            //   </option>

            //   {store.userTalentPool.map((item, index) => {
            //     return (
            //       <option key={index} value={item.id}>
            //         {item.name}
            //       </option>
            //     );
            //   })}
            // </Select>

            <SearchAddRoleTalent
              talentPool={store.userTalentPool}
              handleTalentAssign={handleTalentAssign}
            />
          )
        }
      />
    </ListItem>
  );
};
export default connect(mapStoreToProps)(CrewListItem);
