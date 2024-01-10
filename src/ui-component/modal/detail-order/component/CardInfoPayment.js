import { Card, CardContent, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';
import { formattingVND, getSubTotal } from 'utils/helper';

const RowInfo = (label, value) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ minWidth: '70px' }} variant="h6">
        {label}
      </Typography>
      <Typography variant="h6">{formattingVND(value)}</Typography>
    </Box>
  );
};

const listLabel = [
  {
    label: 'Total :',
    value: 0
  },
  {
    label: 'Discount :',
    value: 0
  },
  {
    label: 'Sale :',
    value: 0
  },
  {
    label: 'Shipping price :',
    value: 0
  }
];
const CardInfoPayment = ({ products }) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (products && products?.length > 0) {
      const totalSub = getSubTotal(products);
      listLabel[0].value = totalSub;
      setTotal(totalSub);
    }
  }, [products]);
  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Typography gutterBottom variant="h4" component="div">
            Info payment
          </Typography>
          {listLabel.map((lable, index) => {
            return RowInfo(lable.label, lable.value);
          })}
          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '5px' }}>
            <Typography color={'#0054a6'} fontWeight={'bold'} variant="h5">
              SubTotal :
            </Typography>
            <Typography color={'#0054a6'} fontWeight={'bold'} variant="h5">
              {total ? formattingVND(total) : 0}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default CardInfoPayment;
