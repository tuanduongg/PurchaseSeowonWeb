import { Box, CardMedia, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddIcon from '@mui/icons-material/Add';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import config from '../../../../config';
import { ShowQuestion } from 'utils/confirm';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`
  };
}
const ListImageProduct = ({ imagesProp, type, onClickImage, afterChangeFiles, handleRemoveImage }) => {
  const [images, setImages] = useState([]);
  const inputRef = useRef(null);

  const handleChangeFiles = (e) => {
    const data = e.target.files;
    afterChangeFiles(data);
    e.target.value = null;
  };

  useEffect(() => {
    if (imagesProp) {
      setImages(imagesProp);
    }
  }, [imagesProp]);
  return (
    <>
      {/* <Box>
        <ImageList
          sx={{
            width: '100%',
            height: 200,
            // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
            transform: 'translateZ(0)'
          }}
          rowHeight={100}
          cols={3}
          gap={1}
        >
          {type !== 'VIEW' && (
            <ImageListItem>
              <Box sx={{ display: 'flex', textAlign: 'center', cursor: 'pointer', lineHeight: '200px', height: '200px' }}>
                <AddIcon
                  onClick={() => {
                    if (inputRef?.current) {
                      inputRef.current.click();
                    }
                  }}
                  sx={{ width: '40%', height: '40%', margin: 'auto', boder: '1px solid #b9b9b9' }}
                />
              </Box>
            </ImageListItem>
          )}
          {images?.length > 0
            ? images.map((item, index) => (
                <ImageListItem key={index}>
                  <CardMedia
                    component="img"
                    sx={{ width: '100%', height: '100%' }}
                    image={type !== 'VIEW' ? item?.createObjectURL : item?.url}
                    title={type !== 'VIEW' ? item?.name : 'image'}
                    alt={'image'}
                  />
                  {type !== 'VIEW' && (
                    <ImageListItemBar
                      sx={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                      }}
                      position="top"
                      actionIcon={
                        <IconButton
                          onClick={() => {
                            alert('click close');
                          }}
                          sx={{ color: 'white' }}
                          aria-label={`close`}
                        >
                          <CloseIcon />
                        </IconButton>
                      }
                      actionPosition="right"
                    />
                  )}
                </ImageListItem>
              ))
            : null}
        </ImageList>
      </Box> */}
      <Box sx={{ paddingTop: '5px' }}>
        <Grid
          container
          spacing={1}
          sx={{
            width: '100%',
            height: 100,
            overflowY: 'auto',
            // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
            transform: 'translateZ(0)'
          }}
        >
          {type !== 'VIEW' && (
            <Grid item xs={4}>
              <ImageListItem>
                <Box sx={{ display: 'flex', textAlign: 'center', cursor: 'pointer', lineHeight: '140px', height: '140px' }}>
                  <AddIcon
                    onClick={() => {
                      if (inputRef?.current) {
                        inputRef.current.click();
                      }
                    }}
                    sx={{ width: '40%', height: '40%', margin: 'auto', boder: '1px solid #b9b9b9' }}
                  />
                </Box>
              </ImageListItem>
            </Grid>
          )}
          {images?.length > 0
            ? images.map((item, index) => (
                <Grid item key={index} xs={4}>
                  <ImageListItem>
                    <CardMedia
                      onClick={() => {
                        onClickImage(index);
                      }}
                      component="img"
                      sx={{ width: '80%', height: '100%' }}
                      image={item?.createObjectURL || config.apiImage + item?.url}
                      title={type !== 'VIEW' ? item?.name : 'image'}
                      alt={'image'}
                    />
                    {type !== 'VIEW' && (
                      <ImageListItemBar
                        sx={{
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                        }}
                        position="top"
                        actionIcon={
                          <IconButton
                            onClick={() => {
                              ShowQuestion({
                                content: 'Do you want to delete this image?',
                                onClickYes: () => {
                                  handleRemoveImage(index);
                                },
                                titleProp: 'Delete',
                                icon: 'warning'
                              });
                            }}
                            sx={{ color: 'white' }}
                            aria-label={`close`}
                          >
                            <CloseIcon />
                          </IconButton>
                        }
                        actionPosition="right"
                      />
                    )}
                  </ImageListItem>
                </Grid>
              ))
            : null}
        </Grid>
      </Box>
      <input type="file" onChange={handleChangeFiles} multiple accept="image/*" ref={inputRef} hidden></input>
    </>
  );
};

export default ListImageProduct;
