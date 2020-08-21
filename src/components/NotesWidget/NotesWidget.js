import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// --- Material-UI
import { Box, Grid, Paper, Typography, TextField } from '@material-ui/core';

function NotesWidget(props) {
  const [note, setNote] = useState('');
  const dispatch = useDispatch();
  const inputRef = useRef(note);

  useEffect(() => {
    console.log('Heeey we are loggin heeeere', note, inputRef);
    const timer = setTimeout(() => {
      if (note === inputRef.current.value) {
        dispatch({
          type: 'UPDATE_NOTE',
          payload: { note: note, id: props.projectID },
        });
        console.log('You should only see this after text input has finished.');
      }
    }, 600);
    return () => {
      clearTimeout(timer);
    };
  }, [note, inputRef, dispatch, props.projectID]);

  const handleChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <Paper elevation={3}>
      <Box m={2} p={0.5} pb={1.5}>
        <Box m={1}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Notes
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <TextField
          id="outlined-multiline-static"
          variant="outlined"
          multiline
          fullWidth
          rows={8}
          ref={inputRef}
          defaultValue={props.note}
          onChange={handleChange}
        />
      </Box>
    </Paper>
  );
}

export default connect(mapStoreToProps)(NotesWidget);
