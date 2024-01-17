import {
  Avatar,
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
  Stack,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formattingVND, truncateText, cssScrollBar, getSubTotal } from 'utils/helper';
import ProductList from 'layout/MainLayout/Header/CartSection/ProductList';
import { IconX } from '@tabler/icons';
import CardInfoReceive from './component/CardInfoReceive';
import CardInfoStepper from './component/CardInfoStepper';
import CardListProduct from './component/CardListProduct';
import CardInfoPayment from './component/CardInfoPayment';
import CardNote from './component/CardNote';
import CancelIcon from '@mui/icons-material/Cancel';
import PrintIcon from '@mui/icons-material/Print';
import CardFormReceive from './component/CardFormReceive';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useEffect } from 'react';
import { useState } from 'react';
import { ShowAlert, ShowQuestion } from 'utils/confirm';
import restApi from 'utils/restAPI';
import { DefineRouteApi } from 'DefineRouteAPI';
import { useDispatch, useSelector } from 'react-redux';
import { CART } from 'store/actions';
import CheckIcon from '@mui/icons-material/Check';
import config from '../../../config';

const COLUMS = [
  { id: 'info_item', label: 'Info item' },
  { id: 'image', label: '' },
  {
    id: 'qty',
    label: 'Quantity',
    // minWidth: 170,
    align: 'left'
  },
  {
    id: 'price',
    label: 'Price',
    // minWidth: 170,
    align: 'center'
    // format: (value) => value.toLocaleString('en-US')
  },
  { id: 'total', label: 'Total' }
];
const DATA_USER = localStorage.getItem(config.DATA_USER);

const checkShowButton = (order, userStatus) => {
  if (order?.status?.level === 0) {
    return false;
  }
  if (DATA_USER) {
    console.log('data user', DATA_USER);
    console.log('order', order);
    console.log('userStatus', userStatus);
    const userOBJ = JSON.parse(DATA_USER);
    if (order?.userID === userOBJ?.id) {
      console.log('case 1');
      return false;
    }
    if (userOBJ?.isManager === true && order?.status?.level === 1) {
      console.log('case 2');
      return true;
    }
    if (userStatus?.userID === order?.status?.userID) {
      console.log('case 3');
      return true;
    }
    if (userStatus?.level > order?.status?.level) {
      console.log('case 4');
      return true;
    }
  }
};

const initValidate = { error: false, message: '' };
const DetailOrder = ({ productProp, open, handleClose, fullScreen, isView, orderSelect, userStatus, allStatus, afterChangeStatus }) => {
  const [products, setProducts] = useState([]);
  const [subTotal, setSubtotal] = useState(0);
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [validateFullname, setValidateFullname] = useState(initValidate);
  const [validateAddress, setValidateAddress] = useState(initValidate);
  const [validateNote, setValidateNote] = useState(initValidate);
  const [isShowButton, setIsShowButton] = useState(false);
  const customization = useSelector((state) => state.customization);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productProp) {
      setProducts(productProp);
    }
  }, [productProp]);

  useEffect(() => {
    if (orderSelect) {
      const productList = [];
      orderSelect?.orderDetail?.map((item, index) => {
        productList.push({ ...item?.product, price: item?.price, quantity: item?.quantity, unitName: item?.unit });
      });
      setProducts(productList);
      setFullname(orderSelect?.reciever);
      setAddress(orderSelect?.address);
      setNote(orderSelect?.note);
      setIsShowButton(checkShowButton(orderSelect, userStatus));
    }
  }, [orderSelect]);

  const onClose = (e, reason) => {
    if (reason != 'backdropClick') {
      setFullname('');
      setAddress('');
      setNote('');
      setValidateFullname(initValidate);
      setValidateAddress(initValidate);
      setValidateNote(initValidate);
      handleClose();
    }
  };
  const createOrder = async () => {
    const data = {
      reciever: fullname,
      note: note,
      address: address,
      products: JSON.stringify(productProp)
    };
    const res = await restApi.post(DefineRouteApi.createOrder, data);
    if (res?.status === 200) {
      ShowAlert({
        textProp: 'Order successful!',
        titleProp: 'Order',
        onClose: () => {
          dispatch({ type: CART, cart: [] });
          localStorage.removeItem('CART');
          onClose();
        }
      });
    }
  };
  const handleClickOrder = () => {
    let check = true;
    if (fullname?.trim() === '') {
      check = false;
      setValidateFullname({ error: true, message: 'Full name is requerid!' });
    }
    if (address?.trim() === '') {
      check = false;
      setValidateAddress({ error: true, message: 'Department is requerid!' });
    }
    if (check) {
      ShowQuestion({
        titleProp: 'Order',
        content: 'Do you want to create new order?',
        onClickYes: () => {
          createOrder();
        }
      });
    }
  };
  const onchangeFullname = (e) => {
    if (validateFullname.error) {
      setValidateFullname(initValidate);
    }
    setFullname(e.target.value);
  };
  const onchangeAddress = (e) => {
    if (validateAddress.error) {
      setValidateAddress(initValidate);
    }
    setAddress(e.target.value);
  };
  const onchangeNote = (e) => {
    if (validateNote.error) {
      setValidateNote(initValidate);
    }
    setNote(e.target.value);
  };
  const handleChangeStatus = async (type) => {
    const url = DefineRouteApi.changeStatusOrder;
    let objSend = {
      orderID: orderSelect?.orderID
    };
    let text = '';
    switch (type) {
      case 'accept':
        text = 'Accept order successful !';
        objSend.status = orderSelect?.status;
        break;
      case 'cancel':
        text = 'Cancel order successful !';
        objSend.status = null;
        break;
      default:
        break;
    }
    const res = await restApi.post(url, objSend);
    if (res?.status === 200) {
      ShowAlert({
        titleProp: 'Order',
        textProp: text,
        onClose: () => {
          afterChangeStatus();
        }
      });
    }
  };
  const onChangeStatusOrder = (type) => {
    switch (type) {
      case 'accept':
        ShowQuestion({
          content: 'Do you want to accept order?',
          titleProp: 'Accept Order',
          onClickYes: () => {
            handleChangeStatus(type);
          }
        });
        break;
      case 'cancel':
        ShowQuestion({
          content: 'Do you want to cancel order?',
          titleProp: 'Cancel Order',
          icon: 'warning',
          onClickYes: () => {
            handleChangeStatus(type);
          }
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Dialog maxWidth={'md'} fullScreen={fullScreen} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle fontSize={'20px'} sx={{ padding: '10px' }} id="responsive-dialog-title">
            <Stack flexDirection={'row'} alignItems={'center'}>
              Order detail
              {orderSelect?.code && (
                <Typography fontSize={'16px'} sx={{ marginLeft: '10px' }} color={'primary'}>{`${orderSelect?.code}`}</Typography>
              )}
            </Stack>
          </DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent sx={{ padding: '10px', minWidth: '50vh', backgroundColor: '#ddd', ...cssScrollBar }}>
          <Box>
            <Grid container spacing={1}>
              {isView && (
                <>
                  <Grid item xs={12} md={4}>
                    <CardInfoReceive
                      note={orderSelect?.note}
                      createAt={orderSelect?.created_at}
                      createBy={orderSelect?.created_by}
                      reciever={orderSelect?.reciever}
                      address={orderSelect?.address}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <CardInfoStepper orderSelect={orderSelect} allStatus={allStatus} />
                  </Grid>
                </>
              )}
              <Grid item xs={12} md={12}>
                <CardListProduct isView={isView} products={products} />
              </Grid>
              {!isView && (
                <Grid item xs={12} md={6}>
                  {/* <CardInfoReceive /> */}
                  <CardFormReceive
                    fullname={fullname}
                    address={address}
                    note={note}
                    validateFullname={validateFullname}
                    validateAddress={validateAddress}
                    validateNote={validateNote}
                    onchangeFullname={onchangeFullname}
                    onchangeAddress={onchangeAddress}
                    onchangeNote={onchangeNote}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={isView ? 12 : 6}>
                <CardInfoPayment products={products} />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <CardNote />
              </Grid> */}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Stack flexDirection={'row'} sx={{ width: '100%' }} justifyContent={isShowButton ? 'space-between' : 'flex-end'}>
            <Box>
              {!isView ? (
                <Button size="small" variant="contained" endIcon={<ShoppingBasketIcon />} onClick={handleClickOrder}>
                  Order
                </Button>
              ) : (
                <Button sx={{ float: 'left' }} size="small" variant="contained" endIcon={<PrintIcon />} onClick={onClose}>
                  Print
                </Button>
              )}
            </Box>
            {isShowButton && (
              <Box>
                <Button
                  size="small"
                  color="error"
                  sx={{ color: 'white' }}
                  variant="contained"
                  endIcon={<CloseIcon />}
                  onClick={() => {
                    onChangeStatusOrder('cancel');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  color="success"
                  sx={{ color: 'white', marginLeft: '10px' }}
                  variant="contained"
                  endIcon={<CheckIcon />}
                  onClick={() => {
                    onChangeStatusOrder('accept');
                  }}
                >
                  Accept
                </Button>
              </Box>
            )}
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailOrder;
