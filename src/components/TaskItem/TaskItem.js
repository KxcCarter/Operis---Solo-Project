import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function TaskItem() {
  const classes = useStyles();
  const [taskState, setTaskState] = useState('');
  const [editMode, setEditMode] = useState(false);

  const handleChange = (event) => {
    setTaskState(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="options-native-simple">Options</InputLabel>
        <Select
          native
          value={taskState.age}
          onChange={handleChange}
          inputProps={{
            name: 'options',
            id: 'options-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
          <option value="remove">Delete</option>
        </Select>
      </FormControl>

      {editMode ? (
        <Typography variant="body1">
          In condimentum sed ex nec faucibus. Pellentesque eget velit ornare
          massa semper tempor. Donec hendrerit mi sit amet lacinia ultricies.
          Aliquam augue diam, rhoncus ut pulvinar eget, commodo ac ex.
        </Typography>
      ) : (
        <>
          <TextField
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="New Task"
            fullWidth
            margin="normal"
          />
          <Button size="small" variant="contained">
            +
          </Button>
        </>
      )}
    </div>
  );
}
