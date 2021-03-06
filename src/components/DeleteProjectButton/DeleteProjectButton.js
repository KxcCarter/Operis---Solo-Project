import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Modal, Box } from '@material-ui/core';

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
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center',
  },
  danger: {
    color: theme.palette.error.dark,
  },
}));

function DeleteProjectButton(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (event) => {
    dispatch({
      type: 'DELETE_PROJECT',
      payload: props.projectID,
    });
    history.push('/projects');
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h3" className={classes.danger}>
        WARNING!
      </Typography>
      <Box p={3}>
        <Typography variant="h6" id="simple-modal-title">
          Are you sure you want to delete
        </Typography>
        <Typography variant="h6" id="simple-modal-title" color="primary">
          {props.projectTitle}?
        </Typography>

        <Typography variant="subtitle2" color="textSecondary">
          This action cannot be undone.
        </Typography>
      </Box>

      <Box p={3} display="inline">
        <Button
          className={classes.danger}
          variant="outlined"
          size="small"
          onClick={handleConfirm}
        >
          Yes, I'm sure.
        </Button>
      </Box>
      <Box p={3} display="inline">
        <Button variant="outlined" size="small" onClick={handleClose}>
          cancel
        </Button>
      </Box>
    </div>
  );

  return (
    <>
      <Button
        className={classes.danger}
        variant="outlined"
        size="small"
        onClick={open ? handleClose : handleOpen}
      >
        Delete Project
      </Button>

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

export default connect(mapStoreToProps)(DeleteProjectButton);
