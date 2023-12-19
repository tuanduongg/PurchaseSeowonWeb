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
const CardNote = () => {
  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Typography gutterBottom variant="h4" component="div">
            Note
          </Typography>
          Office hours are working time in a day of employees and by convention, office hours are calculated as 8 hours a day, excluding
          lunch break.
        </CardContent>
      </Card>
    </>
  );
};

export default CardNote;
