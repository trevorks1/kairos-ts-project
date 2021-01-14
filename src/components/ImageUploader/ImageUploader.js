import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import { Button } from '@material-ui/core';

const dropStyles = {
  width: '200px',
  height: '50px',
  // border: '1px solid black',
  // 'background-color': '#dddddd',
};

class ImageUploader extends Component {
  handleFinishedUpload = (info) => {
    console.log(info);
    // console.log('File upload with filename', info.filename);
    // console.log('Access it on s3 at', info.fileUrl);
    this.props.dispatch({ type: 'POST_IMAGE_URL', payload: info.fileUrl });
  };

  render() {
    const uploadOptions = {
      server: 'http://localhost:5000',
      //signingURLQueryParams: { uploadType: 'avatar' },
    };

    const s3Url = 'https://kairos-images-bucket.s3.amazonaws.com';

    const innerEl = (
      <div>
        <Button variant="contained">Upload Image</Button>
      </div>
    );

    return (
      <DropzoneS3Uploader
        onFinish={this.handleFinishedUpload}
        s3Url={s3Url}
        style={dropStyles}
        children={innerEl}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
      />
    );
  }
}

export default connect()(ImageUploader);
