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
import { formattingVND, truncateText, cssScrollBar } from 'utils/helper';
import ProductList from 'layout/MainLayout/Header/CartSection/ProductList';
import { IconX } from '@tabler/icons';
import CardInfoReceive from './component/CardInfoReceive';
import CardInfoStepper from './component/CardInfoStepper';
import CardListProduct from './component/CardListProduct';
import CardInfoPayment from './component/CardInfoPayment';
import CardNote from './component/CardNote';
import CancelIcon from '@mui/icons-material/Cancel';
import PrintIcon from '@mui/icons-material/Print';

const PRODUCTS = [
  {
    id: '1',
    name: 'Giấy in A4 Double A',
    image: 'https://vanphong-pham.com/wp-content/uploads/2021/10/giay-a4-double.jpg',
    price: 120000,
    quantity: 1
  },
  {
    id: '2',
    name: 'Kim bấm số 10 Plus',
    image: 'https://cdn.fast.vn/tmp/20210217090347-6.JPG',
    price: 5000,
    quantity: 1
  },
  {
    id: '11',
    name: 'Kẹp giấy đầu tròn C32',
    image: 'https://cdn.fast.vn/tmp/20200705175157-7.jpg',
    price: 3200,
    quantity: 1
  },
  {
    id: '13',
    name: 'Kẹp giấy đầu tròn C82 LOẠI LỚN Kẹp giấy đầu',
    image: 'https://cdn.fast.vn/tmp/20210610144411-c82-2.jpg',
    price: 5600,
    quantity: 1
  },
  {
    id: '14',
    name: 'Găng tay len kim 10 ngà 60g',
    image: 'https://img.super-mro.com/super-mro/2023/09/w550/gang-tay-len-kim-10-nga-60g.jpg.webp',
    price: 5600,
    quantity: 1
  },
  {
    id: '15',
    name: 'Băng dính trong',
    image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/387/548/products/bang-dinh-trong-5cm.png?v=1589959476467',
    price: 20000,
    quantity: 1
  },
  {
    id: '1',
    name: 'Giấy in A4 Double A',
    image: 'https://vanphong-pham.com/wp-content/uploads/2021/10/giay-a4-double.jpg',
    price: 120000,
    quantity: 1
  },
  {
    id: '2',
    name: 'Kim bấm số 10 Plus',
    image: 'https://cdn.fast.vn/tmp/20210217090347-6.JPG',
    price: 5000,
    quantity: 1
  },
  {
    id: '11',
    name: 'Kẹp giấy đầu tròn C32',
    image: 'https://cdn.fast.vn/tmp/20200705175157-7.jpg',
    price: 3200,
    quantity: 1
  },
  {
    id: '13',
    name: 'Kẹp giấy đầu tròn C82 LOẠI LỚN Kẹp giấy đầu',
    image: 'https://cdn.fast.vn/tmp/20210610144411-c82-2.jpg',
    price: 5600,
    quantity: 1
  },
  {
    id: '14',
    name: 'Găng tay len kim 10 ngà 60g',
    image: 'https://img.super-mro.com/super-mro/2023/09/w550/gang-tay-len-kim-10-nga-60g.jpg.webp',
    price: 5600,
    quantity: 1
  },
  {
    id: '15',
    name: 'Băng dính trong',
    image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/387/548/products/bang-dinh-trong-5cm.png?v=1589959476467',
    price: 20000,
    quantity: 1
  }
];

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

const DetailOrder = ({ open, handleClose, fullScreen }) => {
  const onClose = (e, reason) => {
    if (reason != 'backdropClick') {
      handleClose();
    }
  };
  return (
    <>
      <Dialog maxWidth={'md'} fullScreen={fullScreen} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle fontSize={'20px'} sx={{ padding: '10px' }} id="responsive-dialog-title">
            <Stack flexDirection={'row'} alignItems={'center'}>
              Order detail
              <Typography variant="body2" ml={1} color={'primary'}>
                #181223112
              </Typography>
            </Stack>
          </DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent sx={{ padding: '15px', minWidth: '50vh', backgroundColor: '#ddd', ...cssScrollBar }}>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <CardInfoReceive />
              </Grid>
              <Grid item xs={12} md={8}>
                <CardInfoStepper />
              </Grid>
              <Grid item xs={12} md={12}>
                <CardListProduct />
              </Grid>
              <Grid item xs={12} md={6}>
                <CardInfoPayment />
              </Grid>
              <Grid item xs={12} md={6}>
                <CardNote />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="contained" endIcon={<PrintIcon />} autoFocus onClick={onClose}>
            Print
          </Button>
          <Button size="small" variant="contained" color="warning" autoFocus endIcon={<CancelIcon />} onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailOrder;
