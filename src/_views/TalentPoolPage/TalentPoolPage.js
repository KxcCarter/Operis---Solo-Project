import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
// import FancyTable from '../../components/FancyTable/FancyTable';

// --- Components ---
import TalentPoolPageItem from '../../components/TalentPoolPageItem/TalentPoolPageItem';

// --- Material-UI ---
import { makeStyles } from '@material-ui/core/styles';

// --- Icons
import AddBox from '@material-ui/icons/AddBox';
import Clear from '@material-ui/icons/Clear';

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
  Box,
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

  const {
    store: { userTalentPool },
  } = props;

  useEffect(() => {
    dispatch({ type: 'GET_USER_TALENT' });
  }, [dispatch]);

  const cancelAdd = () => {
    setTalentDetails({
      name: '',
      contact: '',
      skills: '',
    });
  };

  const handleChange = (fieldKey) => (event) => {
    setTalentDetails({
      ...talentDetails,
      [fieldKey]: event.target.value,
    });
  };

  const saveNewTalent = () => {
    dispatch({ type: 'CREATE_NEW_TAlENT', payload: talentDetails });
    setTalentDetails({
      name: '',
      contact: '',
      skills: '',
    });
  };

  return (
    <>
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
            {/* Add New Person to Pool */}
            <TableRow>
              <TableCell>
                <TextField
                  value={talentDetails.name}
                  onChange={handleChange('name')}
                ></TextField>
              </TableCell>
              <TableCell align="right">
                <TextField
                  value={talentDetails.contact}
                  onChange={handleChange('contact')}
                ></TextField>
              </TableCell>
              <TableCell align="right">
                <TextField
                  value={talentDetails.skills}
                  onChange={handleChange('skills')}
                ></TextField>
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell />

              <TableCell align="right">
                {talentDetails.name && (
                  <Box display="flex">
                    <Button size="small" onClick={saveNewTalent}>
                      <AddBox />
                    </Button>
                    <Button size="small" onClick={cancelAdd}>
                      <Clear />
                    </Button>
                  </Box>
                )}
              </TableCell>
            </TableRow>

            {/* Render the Talent Pool */}

            {userTalentPool.map((item, index) => (
              <TalentPoolPageItem key={item.id} talentData={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <FancyTable talent={userTalentPool} /> */}
    </>
  );
}

export default connect(mapStoreToProps)(TalentPoolPage);
