import { Avatar, Box, Card, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { formattingVND, cssScrollBar, getTotalPrice, isMobile } from 'utils/helper';
import config from '../../../../config';
import NoImage from '../../../../assets/images/product/no-image.png';

const CardListProduct = ({ products, isView }) => {
  // const [listProduct, setListProduct] = useState([]);
  // useEffect(() => {
  //   if (products && products?.length > 0) {
  //     console.log('products', products);
  //     setListProduct(products);
  //   }
  // }, [products]);
  return (
    <>
      <Card>
        <CardContent sx={{ padding: '10px' }}>
          <Grid container sx={{ width: '100%', padding: '5px' }}>
            <Grid item xs={8} sm={4}>
              <Typography color={'black'} variant="h4">
                Item info
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography color={'black'} textAlign={'center'} variant="h4">
                Quantity
              </Typography>
            </Grid>
            {!isMobile() && (
              <Grid item xs={2}>
                <Typography color={'black'} textAlign={'center'} variant="h4">
                  Unit
                </Typography>
              </Grid>
            )}
            {!isMobile() && (
              <Grid item xs={2}>
                <Typography textAlign={'right'} color={'black'} variant="h4">
                  Price
                </Typography>
              </Grid>
            )}
            <Grid item xs={2}>
              <Typography textAlign={'right'} color={'black'} variant="h4">
                Total
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Box sx={{ width: '100%', overflowX: 'hidden', padding: '0px 15px', ...cssScrollBar }}>
            {products?.map((item, index) => (
              <>
                <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={8} sm={4} sx={{ display: 'flex', alignItems: 'center', padding: '0px 3px' }}>
                    <CardMedia
                      sx={{ width: '50px', height: '50px', marginRight: '3px', minWidth: '50px' }}
                      image={item?.images[0]?.url ? config.apiImage + item?.images[0]?.url : NoImage}
                    />
                    <Box>
                      <Typography variant="h5">{item?.productName}</Typography>
                      {isMobile() && (
                        <Typography variant="h6" color={'primary'}>
                          {`${formattingVND(item?.price)}/${isView ? item?.unitName : item?.unit?.unitName}`}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={2} sx={{ textAlign: 'center' }}>
                    {item?.quantity}
                  </Grid>
                  {!isMobile() && (
                    <Grid item xs={2} sx={{ textAlign: 'center' }}>
                      {isView ? item?.unitName : item?.unit?.unitName}
                    </Grid>
                  )}

                  {!isMobile() && (
                    <Grid item xs={2}>
                      <Typography textAlign={'right'} variant="h5">
                        {formattingVND(item?.price)}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={2}>
                    <Typography color={'primary'} textAlign={'right'} variant="h5">
                      {formattingVND(getTotalPrice(item?.quantity, item?.price))}
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
