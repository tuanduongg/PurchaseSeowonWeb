// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';

// assets
import { IconX } from '@tabler/icons';
import { formattingVND, cssScrollBar } from 'utils/helper';
import { useState } from 'react';
import { ShowQuestion } from 'utils/confirm';
import DetailOrder from 'ui-component/modal/detail-order/DetailOrder';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useSelector } from 'react-redux';
import config from '../../../../config';

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

const getTotalPrice = (quantity, unitCost) => {
  return quantity * unitCost;
};
// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const ProductList = ({ onCloseDrawer }) => {
  const [openDetailOrder, setOpenDetailOrder] = useState(false);
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const [listProduct, setListProduct] = useState(customization?.cart ?? []);

  const chipSX = {
    height: 24,
    padding: '0 6px'
  };

  const onChangeValueQuantity = (e, index) => {
    const { value } = e.target;
    let temp = value;
    if (value < 0) {
      temp = value * -1;
    }
    const data = [...listProduct];
    data[index].quantity = temp;
    setListProduct(data);
  };

  const hanldeClickDelete = (index) => {
    ShowQuestion({
      titleProp: 'Warning',
      content: 'Do you want to delete item?',
      onClickYes: () => {
        console.log('index', index);
      }
    });
  };

  const handleDeleteAll = () => {
    ShowQuestion({
      titleProp: 'Warning',
      content: 'Do you want to delete all item?',
      onClickYes: () => {
        console.log('index', index);
      }
    });
  };

  const handleClickOrder = () => {
    setOpenDetailOrder(true);
  };

  const onCloseModalDetailOrder = () => {
    setOpenDetailOrder(false);
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
            <Typography textAlign={'right'} color={'primary'} variant="h4">
              Unit cost
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography textAlign={'right'} color={'primary'} variant="h4">
              Total cost
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Box sx={{ width: '100%', overflowX: 'hidden', padding: '0px 15px', height: '80vh', ...cssScrollBar }}>
          {listProduct.map((item, index) => (
            <>
              <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={5.5} sx={{ display: 'flex', alignItems: 'center', padding: '0px 3px' }}>
                  <Avatar
                    sx={{ width: '50px', height: '50px', marginRight: '3px' }}
                    src={config.apiImage + item?.images?.[0]?.url}
                    variant="square"
                  />
                  <Typography variant="h5">{item?.productName}</Typography>
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
                  <Typography textAlign={'right'} variant="h5">
                    {formattingVND(item?.price)}
                  </Typography>
                </Grid>
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
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0px', marginRight: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
            <Typography variant="h4">Total to pay:</Typography>
            <Typography sx={{ marginRight: '20px' }} color={'primary'} variant="h4">
              123,132,132 đ
            </Typography>
          </Box>
          <Box>
            <Button
              size="small"
              endIcon={<ClearAllIcon />}
              onClick={handleDeleteAll}
              color="secondary"
              sx={{ marginRight: '10px' }}
              variant="contained"
            >
              Clear all
            </Button>
            <Button size="small" onClick={handleClickOrder} variant="contained">
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
      <DetailOrder open={openDetailOrder} isView={true} handleClose={onCloseModalDetailOrder} />
    </>
  );
};

export default ProductList;
