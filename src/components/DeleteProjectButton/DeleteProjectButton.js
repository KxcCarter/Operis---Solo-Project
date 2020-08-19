import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Modal } from '@material-ui/core';

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

function DeleteProjectButton(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const {
    store: { projectDetails },
  } = props;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    dispatch({
      type: 'DELETE_PROJECT',
      payload: props.projectID,
    });
    history.push('/projects');
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h3" color="secondary">
        WARNING!
      </Typography>
      <Typography variant="h6" id="simple-modal-title">
        Are you sure you want to delete this project?
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        This action cannot be undone.
      </Typography>
      <form onSubmit={handleConfirm}>
        <Button variant="outlined" size="small" type="submit" color="secondary">
          Yes, I'm sure.
        </Button>
        <Button variant="outlined" size="small" type="cancel">
          cancel
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <Button
        size="small"
        color="secondary"
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
