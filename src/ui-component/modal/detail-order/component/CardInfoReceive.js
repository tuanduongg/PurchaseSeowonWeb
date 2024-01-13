import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { formatDateFromDB } from 'utils/helper';
const CardInfoReceive = ({ createAt, createBy, reciever, address, note }) => {
  const LABELS = [
    { id: 'CREATE_AT', title: 'Create at', value: createAt ? formatDateFromDB(createAt) : '' },
    { id: 'CREATE_BY', title: 'Create by', value: createBy || '' },
    { id: 'Reciever', title: 'Reciever', value: reciever || '' },
    { id: 'Department', title: 'Address', value: address || '' },
    { id: 'Note', title: 'Note', value: note || '' }
  ];
  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Typography gutterBottom variant="h4" component="div">
            Infomation
          </Typography>
          {LABELS.map((row, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ minWidth: '63px' }} variant="h5">
                {row.title}
              </Typography>
              <Typography variant="body">: {row.value}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default CardInfoReceive;
