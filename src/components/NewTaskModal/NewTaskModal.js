import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Modal, TextField, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function NewTaskModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState('');

  const {
    store: { projectDetails },
  } = props;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: 'CREATE_NEW_TASK',
      payload: { task: task, projectID: projectDetails.id },
    });
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6" id="simple-modal-title">
        New Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          variant="outlined"
          onChange={handleInputChange}
        />
        <Button variant="outlined" size="small" type="submit">
          create
        </Button>
        <Button variant="outlined" size="small" type="cancel">
          cancel
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <Fab
        size="small"
        color="secondary"
        onClick={open ? handleClose : handleOpen}
      >
        <AddIcon />
      </Fab>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
      >
        {body}
      </Modal>
    </>
  );
}

export default connect(mapStoreToProps)(NewTaskModal);
