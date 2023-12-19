import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { formattingVND, cssScrollBar } from 'utils/helper';

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
  }
];
const CardListProduct = () => {
  return (
    <>
      <Card>
        <CardContent sx={{ padding: '10px' }}>
          <Grid container sx={{ width: '100%', padding: '5px' }}>
            <Grid item xs={6}>
              <Typography color={'black'} variant="h4">
                Item info
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography color={'black'} textAlign={'center'} variant="h4">
                Quantity
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography textAlign={'right'} color={'black'} variant="h4">
                Price
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography textAlign={'right'} color={'black'} variant="h4">
                Total
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Box sx={{ width: '100%', overflowX: 'hidden', padding: '0px 15px', ...cssScrollBar }}>
            {PRODUCTS.map((item, index) => (
              <>
                <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', padding: '0px 3px' }}>
                    <Avatar sx={{ width: '50px', height: '50px', marginRight: '3px' }} src={item?.image} variant="square" />
                    <Typography variant="h5">{item?.name}</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ textAlign: 'center' }}>
                    {item?.quantity}
                  </Grid>
                  <Grid item xs={2}>
                    <Typography textAlign={'right'} variant="h5">
                      {formattingVND(item?.price)}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography textAlign={'right'} variant="h5">
                      {formattingVND(item?.price)}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
              </>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default CardListProduct;
