import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

function ImageUpload(props) {
  const uploadOptions = {
    server: 'https://arcane-dusk-92336.herokuapp.com',
    // signingUrlQueryParams: {uploadType: 'avatar'},
  };

  const handleFinishedUpload = (info) => {
    console.log('File uploaded with filename', info.filename);
    console.log('Access it on s3 at', info.fileUrl);
  };

  const s3Url = 'https://operisstorage.s3.amazonaws.com';

  return (
    <DropzoneS3Uploader
      onFinish={handleFinishedUpload}
      s3Url={s3Url}
      maxSize={1024 * 1024 * 5}
      upload={uploadOptions}
    />
  );
}

export default connect(mapStoreToProps)(ImageUpload);
