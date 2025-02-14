// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, CardMedia, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';

// assets
import { IconX } from '@tabler/icons';
import { formattingVND, cssScrollBar, getTotalPrice, getSubTotal, isMobile } from 'utils/helper';
import { useState } from 'react';
import { ShowQuestion } from 'utils/confirm';
import DetailOrder from 'ui-component/modal/detail-order/DetailOrder';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../../../config';
import { CART } from 'store/actions';
import CartEmpty from './CartEmpty';
import { useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NoImage from '../../../../assets/images/product/no-image.png';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  '&:hover': {
    background: theme.palette.primary.light
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const ProductList = ({ onCloseDrawer }) => {
  const [openDetailOrder, setOpenDetailOrder] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const [listProduct, setListProduct] = useState([]);

  const setDataCart = (arrNew) => {
    dispatch({ type: CART, cart: arrNew });
    localStorage.setItem('CART', JSON.stringify(arrNew));
  };
  const chipSX = {
    height: 24,
    padding: '0 6px'
  };

  useEffect(() => {
    if (customization?.cart) {
      setListProduct(customization?.cart);
    }
  }, [customization?.cart]);

  const onChangeValueQuantity = (e, index) => {
    const { value } = e.target;
    let temp = value;
    if (value < 0) {
      temp = value * -1;
    }
    // if (temp < 1) {
    //   temp = 1;
    // }
    const data = [...listProduct];
    data[index].quantity = temp;
    setListProduct(data);
  };

  const hanldeClickDelete = (index) => {
    ShowQuestion({
      titleProp: 'Warning',
      content: 'Do you want to delete item?',
      onClickYes: () => {
        const arrNew = [...listProduct];
        arrNew.splice(index, 1);
        setListProduct(arrNew);
        setDataCart(arrNew);
      }
    });
  };

  const handleDeleteAll = () => {
    if (listProduct?.length > 0) {
      ShowQuestion({
        titleProp: 'Warning',
        content: 'Do you want to delete all item?',
        onClickYes: () => {
          setListProduct([]);
          dispatch({ type: CART, cart: [] });
          localStorage.removeItem('CART');
        }
      });
    }
  };

  const handleClickOrder = () => {
    if (listProduct?.length > 0) {
      setOpenDetailOrder(true);
    }
  };

  const onCloseModalDetailOrder = () => {
    setOpenDetailOrder(false);
  };

  const handleBlur = (e, index) => {
    const { value } = e.target;
    const productArr = [];
    listProduct.map((item, key) => {
      let temp = value;
      if (value < 0) {
        temp = value * -1;
      }
      if (key === index && temp < 1) {
        item.quantity = 1;
      }
      productArr.push(item);
    });
    setListProduct(productArr);
    setDataCart(productArr);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%'
          // minWidth: '',
          // py: 0,
          // px: 1,
          // borderRadius: '10px',
          // [theme.breakpoints.down('md')]: {
          //   maxWidth: 300
          // },
          // '& .MuiListItemSecondaryAction-root': {
          //   top: 22
          // },
          // '& .MuiDivider-root': {
          //   my: 0
          // },
          // '& .list-container': {
          //   pl: 7
          // }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h2" sx={{ margin: '10px 5px' }}>
            Your Cart
          </Typography>
          <IconButton onClick={onCloseDrawer}>
            <IconX color="#ddd" />
          </IconButton>
        </Box>
        <Grid container sx={{ width: '100%', padding: '5px' }}>
          <Grid item xs={7.5} sm={5.5}>
            <Typography color={'primary'} variant="h4">
              Item info
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography color={'primary'} variant="h4">
              Quantity
            </Typography>
          </Grid>
          {!isMobile() && (
            <Grid item xs={0} sm={2}>
              <Typography textAlign={'right'} color={'primary'} variant="h4">
                Unit cost
              </Typography>
            </Grid>
          )}
          <Grid item xs={2}>
            <Typography textAlign={'right'} color={'primary'} variant="h4">
              Total cost
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Box sx={{ overflowX: 'hidden', padding: '0px 15px', height: '75vh', ...cssScrollBar }}>
          {listProduct?.length > 0 ? (
            listProduct.map((item, index) => (
              <>
                <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={7.5} sm={5.5} sx={{ display: 'flex', alignItems: 'center', padding: '0px 3px' }}>
                    <CardMedia
                      sx={{ width: '50px', height: '50px', marginRight: '3px', minWidth: '50px' }}
                      image={item?.images?.[0]?.url ? config.apiImage + item?.images?.[0]?.url : NoImage}
                    />
                    <Box>
                      <Typography variant="h5">{item?.productName}</Typography>
                      {isMobile() && (
                        <Typography color={'primary'} variant="h6">
                          {formattingVND(item?.price)}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box sx={{ display: 'flex', alignContent: 'center' }}>
                      <TextField
                        defaultValue={1}
                        onChange={(e) => {
                          onChangeValueQuantity(e, index);
                        }}
                        value={item?.quantity ?? 1}
                        variant="standard"
                        min={1}
                        sx={{ width: { xs: '30px', sm: '60px' } }}
                        type="number"
                        onBlur={(e) => {
                          handleBlur(e, index);
                        }}
                      />
                    </Box>
                  </Grid>
                  {!isMobile() && (
                    <Grid item xs={2}>
                      <Typography textAlign={'right'} variant="h5">
                        {formattingVND(item?.price)}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={2}>
                    <Typography textAlign={'right'} variant="h5">
                      {formattingVND(getTotalPrice(item?.quantity, item?.price))}
                    </Typography>
                  </Grid>
                  <Grid item xs={0.5}>
                    <IconButton
                      onClick={() => {
                        hanldeClickDelete(index);
                      }}
                    >
                      <IconX color="red" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider />
              </>
            ))
          ) : (
            <CartEmpty />
          )}
        </Box>
        <Box
          sx={{
            display: { sm: 'flex', xs: 'block' },
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 0px',
            marginRight: '10px'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
            <Typography variant="h4">Total to pay:</Typography>
            <Typography sx={{ marginLeft: '10px' }} color={'primary'} variant="h4">
              {formattingVND(getSubTotal(listProduct))}
            </Typography>
          </Box>
          <Box sx={{ textAlign: { xs: 'right', sm: '' } }}>
            <Button
              size="small"
              endIcon={<ClearAllIcon />}
              onClick={handleDeleteAll}
              color="warning"
              sx={{ marginRight: '10px' }}
              variant="contained"
            >
              Clear all
            </Button>
            <Button size="small" endIcon={<ArrowForwardIosIcon />} onClick={handleClickOrder} variant="contained">
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
      <DetailOrder
        fullScreen={isMobile() ? true : false}
        productProp={listProduct}
        open={openDetailOrder}
        isView={false}
        handleClose={onCloseModalDetailOrder}
      />
    </>
  );
};

export default ProductList;
