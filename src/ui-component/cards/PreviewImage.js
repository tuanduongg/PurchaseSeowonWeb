import React, { useState, useCallback } from 'react';
import { CardMedia } from '@mui/material';
import FsLightbox from 'fslightbox-react';

const PreviewImage = ({ imagesProp, toggler }) => {

  return (
    <>
      <FsLightbox type={'image'} toggler={toggler} sources={imagesProp} />
    </>
  );
};
export default PreviewImage;
