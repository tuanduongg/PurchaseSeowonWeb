import { Card, CardContent, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { formattingVND } from 'utils/helper';

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
    value: 1124000
  },
  {
    label: 'Discount :',
    value: 120000
  },
  {
    label: 'Sale :',
    value: 0
  },
  {
    label: 'Shipping price :',
    value: 30000
  }
];
const CardInfoPayment = () => {
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
              {formattingVND(1124000)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default CardInfoPayment;
