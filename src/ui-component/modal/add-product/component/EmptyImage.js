import { Box, IconButton, Typography } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';


const EmptyImage = () => {
  return (
    <>
      <Box sx={{ width: '100%', height: '150px', border: '2px dashed #ddd', textAlign: 'center', lineHeight: '200px' }}>
        <IconButton>
          <FileUploadIcon />
          <Typography variant="span" component={'span'} fontSize={'18px'}>
            Add image
          </Typography>
        </IconButton>
      </Box>
    </>
  );
};

export default EmptyImage;
