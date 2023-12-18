// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconMinus, IconPhoto, IconPlus, IconX } from '@tabler/icons';
import User1 from 'assets/images/users/profile.png';
import { formattingVND,cssScrollBar } from 'utils/helper';
import { useState } from 'react';
import { ShowQuestion } from 'utils/confirm';

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

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const ProductList = ({onCloseDrawer}) => {
  const [listProduct, setListProduct] = useState(PRODUCTS);
  const theme = useTheme();

  const chipSX = {
    height: 24,
    padding: '0 6px'
  };

  const onChangeValueQuantity = (e, index) => {
    const { value } = e.target;
    let temp = value;
    if(value < 0) {
      temp = value * -1
    }
      const data = [...PRODUCTS];
      data[index].quantity = temp;
      setListProduct(data);
  };

  const hanldeClickDelete = (index) => {
    ShowQuestion({
      titleProp: "Thông báo", content: "Are you sure delete item?", onClickYes: () => {
        console.log('index', index);
      }
    });
  }

  return (
    <Box
      sx={{
        width: '100%',
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
      <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Typography variant="h2" sx={{ margin: '10px 5px' }}>Your Cart</Typography>
        <IconButton onClick={onCloseDrawer}>
          <IconX color="#ddd" />
        </IconButton>
      </Box>
      <Grid container sx={{ width: '100%', padding: '5px' }}>
        <Grid item xs={5.5}>
          <Typography color={'primary'} variant="h4">
            Item info
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography color={'primary'} variant="h4">
            Quantity
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography color={'primary'} variant="h4">
            Price
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography color={'primary'} variant="h4">
            Total
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Box sx={{ width: '100%', overflowX: 'hidden', padding: '0px 15px', height: '80vh',...cssScrollBar }}>
        {listProduct.map((item, index) => (
          <>
            <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid item xs={5.5} sx={{ display: 'flex', alignItems: 'center', padding: '0px 3px' }}>
                <Avatar sx={{ width: '50px', height: '50px', marginRight: '3px' }} src={item?.image} variant="square" />
                <Typography variant="h5">{item?.name}</Typography>
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
                    sx={{ width: '60px' }}
                    type="number"
                  />
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h5">{formattingVND(item?.price)}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h5">{formattingVND(item?.price)}</Typography>
              </Grid>
              <Grid item xs={0.5}>
                <IconButton onClick={() => { hanldeClickDelete(index) }}>
                  <IconX color="red" />
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
          </>
        ))}
      </Box>
      <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0px',marginRight:'10px'}}>
        <Box sx={{display:'flex',alignItems:'center',marginLeft:'5px'}}>
          <Typography variant="h4">Total:</Typography>
          <Typography sx={{ marginRight: '20px' }} color={'primary'} variant="h4">
            123,132,132 đ
          </Typography>
        </Box>
        <Button size="small" variant="contained">
          Order
        </Button>
      </Box>
    </Box>
  );
};

export default ProductList;
