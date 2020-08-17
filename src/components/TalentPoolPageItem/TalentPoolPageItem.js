import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// --- Material-UI ---
import { TextField, TableRow, TableCell, Button } from '@material-ui/core';

// --- Icons
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Clear from '@material-ui/icons/Clear';

function TalentPoolPageItem(props) {
  const dispatch = useDispatch();

  const [talentDetails, setTalentDetails] = useState({
    name: '',
    contact: '',
    skills: '',
  });

  const { talentData } = props;

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (fieldKey) => (event) => {
    setTalentDetails({
      ...talentDetails,
      [fieldKey]: event.target.value,
    });
  };

  const cancelChanges = () => {
    setEditMode(false);
  };

  const updateTalentDetails = () => {
    dispatch({
      type: 'UPDATE_TALENT_DETAILS',
      payload: {
        name: talentDetails.name || talentData.name,
        contact: talentDetails.contact || talentData.contact_details,
        skills: talentDetails.skills || talentData.primary_skills,
        id: talentData.id,
      },
    });
    toggleEditMode();
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {!editMode ? (
          talentData.name
        ) : (
          <TextField
            defaultValue={talentData.name}
            onChange={handleChange('name')}
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editMode ? (
          talentData.contact_details
        ) : (
          <TextField
            defaultValue={talentData.contact_details}
            onChange={handleChange('contact')}
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editMode ? (
          talentData.primary_skills
        ) : (
          <TextField
            defaultValue={talentData.primary_skills}
            onChange={handleChange('skills')}
          />
        )}
      </TableCell>
      <TableCell align="right">
        {talentData.is_assigned ? 'Yes' : 'No'}
      </TableCell>
      <TableCell align="right">{talentData.id}</TableCell>
      <TableCell align="right">
        <Button onClick={!editMode ? toggleEditMode : updateTalentDetails}>
          {!editMode ? <EditIcon /> : <SaveAltIcon />}
        </Button>
        {editMode && (
          <Button onClick={cancelChanges}>
            <Clear />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

export default connect(mapStoreToProps)(TalentPoolPageItem);
