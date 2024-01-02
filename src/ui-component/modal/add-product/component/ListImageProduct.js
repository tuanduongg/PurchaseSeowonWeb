import { Box, CardMedia, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddIcon from '@mui/icons-material/Add';

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
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac'
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33'
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    featured: true
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta'
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman'
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex'
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls'
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster'
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs'
  }
];
const ListImageProduct = () => {
  return (
    <>
      <Box>
        <ImageList
          sx={{
            width: '100%',
            height: 200,
            // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
            transform: 'translateZ(0)'
          }}
          rowHeight={200}
          cols={2}
          gap={1}
        >
          <ImageListItem>
            <Box sx={{ display: 'flex', textAlign: 'center', cursor: 'pointer', lineHeight: '200px', height: '200px' }}>
              {/* <IconButton sx={{ width: '100%', height: '100%' }}> */}
              <AddIcon sx={{ width: '50%', height: '50%', margin: 'auto' }} />
              {/* </IconButton> */}
            </Box>
          </ImageListItem>
          {itemData.map((item) => {
            return (
              <ImageListItem key={item.img}>
                <CardMedia component="img" image={item.img} title="image" alt={'image'} />
                <ImageListItemBar
                  sx={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                  }}
                  position="top"
                  actionIcon={
                    <IconButton sx={{ color: 'white' }} aria-label={`star ${item.title}`}>
                      <CloseIcon />
                    </IconButton>
                  }
                  actionPosition="right"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
    </>
  );
};

export default ListImageProduct;
