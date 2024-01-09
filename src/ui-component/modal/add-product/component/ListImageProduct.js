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
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    featured: true
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726'
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik'
  }
  // {
  //   img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
  //   title: 'Coffee',
  //   author: '@nolanissac'
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
  //   title: 'Hats',
  //   author: '@hjrc33'
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
  //   title: 'Honey',
  //   author: '@arwinneil',
  //   featured: true
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
  //   title: 'Basketball',
  //   author: '@tjdragotta'
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  //   title: 'Fern',
  //   author: '@katie_wasserman'
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  //   title: 'Mushrooms',
  //   author: '@silverdalex'
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  //   title: 'Tomato basil',
  //   author: '@shelleypauls'
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  //   title: 'Sea star',
  //   author: '@peterlaster'
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
  //   title: 'Bike',
  //   author: '@southside_customs'
  // }
];
const ListImageProduct = ({ imagesProp, type, afterChangeFiles, handleRemoveImage }) => {
  const [images, setImages] = useState([]);
  const inputRef = useRef(null);

  const handleChangeFiles = (e) => {
    const data = e.target.files;
    afterChangeFiles(data);
    e.target.value = null;
  };

  useEffect(() => {
    if (imagesProp) {
      console.log('imagesProp', imagesProp);
      setImages(imagesProp);
    }
  }, [imagesProp]);
  console.log('type', type);
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
            height: 150,
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
                      component="img"
                      sx={{ width: '100%', height: '100%' }}
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
