import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formattingVND } from 'utils/helper';
import ImageSlide from './ImageSilde';
import { IconShoppingCart } from '@tabler/icons';

const ModalDetailProduct = ({ product, open, handleClose, fullScreen }) => {
  const onClose = (e, reason) => {
    if (reason != 'backdropClick') {
      handleClose();
    }
  };

  return (
    <>
      <Dialog sx={{ '& .MuiPaper-root': { minWidth: '50%' } }} maxWidth={'md'} fullScreen={fullScreen} open={open} onClose={onClose}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle fontSize={'20px'} sx={{ padding: '10px' }}>
            Product detail
          </DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <ImageSlide images={product?.images} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box sx={{ marginLeft: '15px' }}>
                <Typography variant="h2" sx={{ margin: { xs: '5px', sm: '0px' } }}>
                  {product?.productName}
                </Typography>
                <Typography variant="h3" color={'primary'} sx={{ marginTop: '15px' }}>
                  {product?.price ? formattingVND(product?.price) : ''}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                  <Typography variant="h5" sx={{ margin: '0px 10px 0px 0px' }}>
                    Quantity :
                  </Typography>
                  <TextField
                    type="number"
                    size="small"
                    defaultValue={1}
                    sx={{
                      width: '70px',
                      '& fieldset': { borderRadius: '0px' },
                      '& input': { padding: '2px !important' }
                    }}
                    id="outlined-basic"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ minHeight: '25vh' }}>
                  <Typography variant="h5" sx={{ margin: '20px 0px 0px 0px' }}>
                    Description :
                  </Typography>
                  <Typography variant="p" sx={{ margin: '10px 0px 0px 0px' }}>
                    {product?.description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    marginTop: '15px'
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      width: { xs: '100%', sm: '60%' },
                      height: '30px',
                      lineHeight: '30px',
                      backgroundColor: '#0054a6',
                      color: 'white',
                      cursor: 'pointer',
                      margin: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    Add to cart <IconShoppingCart />
                  </Box>
                </Box>
              </Box>
              {/* <DialogContentText>
                Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are
                running.
              </DialogContentText> */}
            </Grid>
          </Grid>
        </DialogContent>
        {/* <DialogActions>
          <Button startIcon={<CloseIcon />} size="small" variant="contained" autoFocus onClick={onClose}>
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default ModalDetailProduct;
