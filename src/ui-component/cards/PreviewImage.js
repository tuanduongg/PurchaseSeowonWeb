import React, { useState, useCallback } from 'react';
import { CardMedia } from '@mui/material';
import FsLightbox from 'fslightbox-react';

const PreviewImage = ({ imagesProp, toggler, slide }) => {
  return (
    <>
      <FsLightbox sourceIndex={slide} type={'image'} toggler={toggler} key={imagesProp?.length} sources={imagesProp} />
    </>
  );
};
export default PreviewImage;
