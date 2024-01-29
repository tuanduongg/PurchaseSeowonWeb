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
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import CustomAlert from 'ui-component/alert/CustomAlert';
import { UPDATE_CART_ITEM } from 'store/actions';
import config from '../../../config';
import PreviewImage from 'ui-component/cards/PreviewImage';
import { useEffect } from 'react';

const ModalDetailProduct = ({ product, open, handleClose, fullScreen }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [openSnack, setOpenSnack] = useState(false);
  const [toggerImage, setToggerImage] = useState(false);
  const [imagesURL, setImageURL] = useState([]);
  const [openToImage, setOpenToImage] = useState(0);

  const onClose = (e, reason) => {
    if (reason != 'backdropClick') {
      setQuantity(1);
      handleClose();
    }
  };

  useEffect(() => {
    if (product && open) {
      const data = product?.images?.map((item) => config.apiImage + item?.url);
      setImageURL(data);
    }
  }, [product]);

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleClickAddToCart = () => {
    let intQuantity = parseInt(quantity);
    if (isNaN(intQuantity) || quantity < 0) {
      intQuantity = 1;
      setQuantity(1);
    }

    const item = { ...product, quantity: intQuantity };
    dispatch({ type: UPDATE_CART_ITEM, product: item });
    setOpenSnack(true);
  };

  const onClickImage = (index) => {
    setOpenToImage(index);
    setToggerImage(!toggerImage);
  };
  return (
    <>
      <Dialog
        disableEscapeKeyDown={true}
        sx={{ '& .MuiPaper-root': { minWidth: '50%' } }}
        maxWidth={'md'}
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
      >
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
              <ImageSlide onClickImage={onClickImage} images={product?.images} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box sx={{ marginLeft: '15px' }}>
                <Typography variant="h2" sx={{ margin: { xs: '5px', sm: '0px' } }}>
                  {product?.productName}
                </Typography>
                <Typography variant="h3" color="primary" sx={{ marginTop: '15px' }}>
                  {product?.price ? `${formattingVND(product?.price)}/${product?.unit?.unitName}` : ''}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                  <Typography variant="h5" sx={{ margin: '0px 10px 0px 0px' }}>
                    Quantity :
                  </Typography>
                  <TextField
                    value={quantity}
                    onChange={(e) => {
                      // if (parseInt(e.target.value) > parseInt(product?.inventory)) {
                      //   setQuantity(product?.inventory);
                      // } else {
                      setQuantity(e.target.value);
                      // }
                    }}
                    type="number"
                    size="small"
                    defaultValue={1}
                    sx={{
                      width: '50px',
                      '& fieldset': { borderRadius: '0px' },
                      '& input': { padding: '2px !important' }
                    }}
                    id="outlined-basic"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ minHeight: '25vh' }}>
                  {/* <Typography variant="h5" sx={{ margin: '20px 0px 0px 0px' }}>
                    Inventory : {product?.inventory}
                  </Typography> */}
                  <Typography sx={{ margin: '20px 0px 0px 0px' }} variant="h5">Description :</Typography>
                  <Typography dangerouslySetInnerHTML={{ __html: product?.description }} variant="p" sx={{ margin: '10px 0px 0px 0px' }}>
                    {/* {product?.description} */}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    marginTop: '15px'
                  }}
                >
                  <Box
                    onClick={handleClickAddToCart}
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
      <CustomAlert type={'success'} open={openSnack} handleClose={handleCloseSnack} content={'Add product to cart successfully!'} />
      <PreviewImage toggler={toggerImage} slide={openToImage} imagesProp={imagesURL} />
    </>
  );
};

export default ModalDetailProduct;
