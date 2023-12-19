import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';

const CardInfoReceive = () => {
  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Typography gutterBottom variant="h4" component="div">
            Info receiver
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ minWidth: '70px' }} variant="h6">
              Fullname :
            </Typography>
            <Typography variant="h6">Dương Ngô Tuấn</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ minWidth: '70px' }} variant="h6">
              Address :
            </Typography>
            <Typography variant="h6">Seowonintech</Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default CardInfoReceive;
