import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Modal, Fab, Box } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

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
    textAlign: 'center',
  },
  root: {
    backgroundColor: theme.palette.success.main,
  },
  incomplete: {
    backgroundColor: theme.palette.warning.dark,
  },
  success: {
    color: theme.palette.success.main,
  },
  warning: {
    color: theme.palette.warning.dark,
  },
}));

function NewTaskModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: 'MARK_PROJECT_COMPLETE',
      payload: {
        projectStatus: !props.projectStatus,
        projectID: props.projectID,
      },
    });
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box p={3} display="inline">
        <Typography
          variant="h4"
          id="simple-modal-title"
          align="center"
          gutterBottom
          className={props.projectStatus ? classes.success : classes.warning}
        >
          {props.projectTitle} is{' '}
          {props.projectStatus ? 'already complete!' : 'incomplete.'}
        </Typography>
        <Typography
          variant="h5"
          id="simple-modal-title"
          align="center"
          gutterBottom
          color="primary"
        >
          Are you sure you want to mark {props.projectTitle}{' '}
          {props.projectStatus ? 'incomplete' : 'complete'}?
        </Typography>
      </Box>
      <Box p={3} display="inline">
        <Button
          variant="outlined"
          size="small"
          className={!props.projectStatus ? classes.success : classes.warning}
          onClick={handleSubmit}
        >
          {props.projectStatus ? (
            <CheckCircleOutlineIcon />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
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
      <Fab
        size="small"
        className={props.projectStatus ? classes.root : classes.incomplete}
        onClick={open ? handleClose : handleOpen}
      >
        {props.projectStatus ? (
          <CheckCircleOutlineIcon />
        ) : (
          <RadioButtonUncheckedIcon />
        )}
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
