import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

//
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
    width: 200,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.contrastText,
  },
}));

function ImageUpload(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [uploadFinished, setUploadFinished] = useState(false);
  const [filename, setFilename] = useState('');

  // let filename;
  let fileUrl;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const deleteS3Image = () => {
  //   dispatch({
  //     type: 'DELETE_S3_IMAGE',
  //     payload: { key: filename },
  //   });
  // };

  const confirmUpload = () => {
    dispatch({
      type: 'POST_IMG_URL',
      payload: { image: fileUrl, id: props.pID },
    });
    handleClose();
  };

  const cancelUpload = () => {
    console.log('Here is what we want to delete: ', filename);
    dispatch({
      type: 'DELETE_S3_IMAGE',
      payload: { key: filename },
    });
    handleClose();
  };

  const uploadOptions = {
    // NOTE! CHange to local for development and career day.
    // server: 'https://arcane-dusk-92336.herokuapp.com',
    server: 'http://localhost:5000',
    // signingUrlQueryParams: {uploadType: 'avatar'},
  };

  const handleFinishedUpload = (info) => {
    console.log('File uploaded with filename', info.filename);
    console.log('Access it on s3 at', info.fileUrl);
    setFilename(info.filename);
    // filename = info.filename;
    fileUrl = info.fileUrl;

    setUploadFinished(true);
    // dispatch({
    //   type: 'POST_IMG_URL',
    //   payload: { image: info.fileUrl, id: props.pID },
    // });
  };

  const s3Url = 'https://operisstorage.s3.amazonaws.com';

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6" id="simple-modal-title" gutterBottom>
        Upload an image
      </Typography>
      <DropzoneS3Uploader
        onFinish={handleFinishedUpload}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
        filename="operisProject"
        scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/gi, '')}
      />
      {uploadFinished && (
        <Box>
          <Button onClick={confirmUpload}>done</Button>{' '}
          <Button onClick={cancelUpload}>cancel</Button>
        </Box>
      )}
    </div>
  );

  return (
    <>
      <Button
        className={classes.button}
        size="small"
        variant="contained"
        onClick={open ? handleClose : handleOpen}
      >
        Upload Image
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

export default connect(mapStoreToProps)(ImageUpload);
