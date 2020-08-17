import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// --- Material-UI ---
import {
  TextField,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Button,
} from '@material-ui/core';

// --- Icons
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

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

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {talentData.name}
      </TableCell>
      <TableCell align="right">{talentData.contact_details}</TableCell>
      <TableCell align="right">{talentData.primary_skills}</TableCell>
      <TableCell align="right">{talentData.is_assigned}</TableCell>
      <TableCell align="right">{talentData.id}</TableCell>
      <TableCell align="right">
        <Button onClick={toggleEditMode}>
          {!editMode ? <EditIcon /> : <SaveAltIcon />}
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default connect(mapStoreToProps)(TalentPoolPageItem);
