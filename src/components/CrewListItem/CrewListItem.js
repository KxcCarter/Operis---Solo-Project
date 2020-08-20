import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

// --- Material-UI
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import SearchAddRoleTalent from '../SearchAddRoleTalent/SearchAddRoleTalent';

const useStyles = makeStyles((theme) => ({
  delete: {
    color: theme.palette.warning.light,
  },
}));

const CrewListItem = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { store } = props;

  const handleClickDelete = () => {
    dispatch({
      type: 'DELETE_CREW_ROLE',
      payload: {
        projectID: props.crewList.project_id,
        crewRoleID: props.crewList.id,
      },
    });
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
        <IconButton
          edge="end"
          aria-label="delete role"
          onClick={handleClickDelete}
        >
          <DeleteIcon size="small" className={classes.delete} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default connect(mapStoreToProps)(CrewListItem);
