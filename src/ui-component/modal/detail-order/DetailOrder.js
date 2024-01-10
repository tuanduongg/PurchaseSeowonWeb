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
import { useDispatch } from 'react-redux';
import { CART } from 'store/actions';

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
const initValidate = { error: false, message: '' };
const DetailOrder = ({ productProp, open, handleClose, fullScreen, isView }) => {
  const [products, setProducts] = useState([]);
  const [subTotal, setSubtotal] = useState(0);
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [validateFullname, setValidateFullname] = useState(initValidate);
  const [validateAddress, setValidateAddress] = useState(initValidate);
  const [validateNote, setValidateNote] = useState(initValidate);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productProp) {
      setProducts(productProp);
    }
  }, [productProp]);

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
          console.log('close');
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
      setValidateAddress({ error: true, message: 'Address is requerid!' });
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

  return (
    <>
      <Dialog maxWidth={'md'} fullScreen={fullScreen} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle fontSize={'20px'} sx={{ padding: '10px' }} id="responsive-dialog-title">
            <Stack flexDirection={'row'} alignItems={'center'}>
              Order detail
              {isView ? (
                ''
              ) : (
                <Typography variant="body2" ml={1} color={'primary'}>
                  #181223112
                </Typography>
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
              {/* <Grid item xs={12} md={8}>
                <CardInfoStepper />
              </Grid> */}
              <Grid item xs={12} md={12}>
                <CardListProduct products={products} />
              </Grid>
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
              <Grid item xs={12} md={6}>
                <CardInfoPayment products={products} />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <CardNote />
              </Grid> */}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button
            size="small"
            sx={{ marginRight: '10px' }}
            variant="contained"
            color="secondary"
            autoFocus
            endIcon={<CancelIcon />}
            onClick={onClose}
          >
            Cancel
          </Button> */}
          {isView ? (
            <Button size="small" variant="contained" endIcon={<ShoppingBasketIcon />} onClick={handleClickOrder}>
              Order
            </Button>
          ) : (
            <Button size="small" variant="contained" endIcon={<PrintIcon />} onClick={onClose}>
              Print
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailOrder;
