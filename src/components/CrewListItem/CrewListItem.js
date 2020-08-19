import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

// --- Components

// --- Material-UI
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  ListItemSecondaryAction,
} from '@material-ui/core';

import Clear from '@material-ui/icons/Clear';

import SearchAddRoleTalent from '../SearchAddRoleTalent/SearchAddRoleTalent';

const CrewListItem = (props) => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);

  const { store } = props;

  const handleChecked = () => {
    setChecked(!checked);
    console.log(props);
  };

  const handleTalentAssign = (talent) => (event) => {
    dispatch({
      type: 'ADD_TALENT_TO_ROLE',
      payload: {
        id: props.crewList.id,
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
            <SearchAddRoleTalent
              talentPool={store.userTalentPool}
              handleTalentAssign={handleTalentAssign}
            />
          )
        }
      />
      <ListItemSecondaryAction>
        <Clear size="small" />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default connect(mapStoreToProps)(CrewListItem);
