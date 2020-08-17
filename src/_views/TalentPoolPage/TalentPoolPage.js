import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { IMaskInput } from 'react-imask';

// --- Components ---
import TalentPoolPageItem from '../../components/TalentPoolPageItem/TalentPoolPageItem';

// --- Material-UI ---
import { makeStyles } from '@material-ui/core/styles';

// --- Icons
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import UndoIcon from '@material-ui/icons/Undo';

import {
  TextField,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function TalentPoolPage(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [talentDetails, setTalentDetails] = useState({
    name: '',
    contact: '',
    skills: '',
  });

  const [editMode, setEditMode] = useState(false);

  const {
    store: { userTalentPool },
  } = props;

  useEffect(() => {
    dispatch({ type: 'GET_USER_TALENT' });
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (fieldKey) => (event) => {
    setTalentDetails({
      ...talentDetails,
      [fieldKey]: event.target.value,
    });
    console.log('handling that change, yo: ', talentDetails);
  };

  const saveNewTalent = () => {
    dispatch({ type: 'CREATE_NEW_TAlENT', payload: talentDetails });
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Talent Name</TableCell>
            <TableCell align="right">Contact Details</TableCell>
            <TableCell align="right">Primary Skills</TableCell>
            <TableCell align="right">Assigned to Project?</TableCell>
            <TableCell align="right">Talent ID</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField onChange={handleChange('name')}></TextField>
            </TableCell>
            <TableCell align="right">
              <TextField onChange={handleChange('contact')}></TextField>
            </TableCell>
            <TableCell align="right">
              <TextField onChange={handleChange('skills')}></TextField>
            </TableCell>
            <TableCell align="right">
              <IMaskInput
                mask={Number}
                radix="."
                value="123"
                unmask={false} // true|false|'typed'
                // access to nested input
                // DO NOT USE onChange TO HANDLE CHANGES!
                // USE onAccept INSTEAD
                onAccept={
                  // depending on prop above first argument is
                  // `value` if `unmask=false`,
                  // `unmaskedValue` if `unmask=true`,
                  // `typedValue` if `unmask='typed'`
                  (value, mask) => console.log(value)
                }
                // ...and more mask props in a guide

                // input props also available
                placeholder="Enter number here"
              />
            </TableCell>
            <TableCell />

            <TableCell align="right">
              <Button onClick={saveNewTalent}>Add</Button>
            </TableCell>
          </TableRow>
          {userTalentPool.map((item, index) => (
            <TalentPoolPageItem key={item.id} talentData={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default connect(mapStoreToProps)(TalentPoolPage);
