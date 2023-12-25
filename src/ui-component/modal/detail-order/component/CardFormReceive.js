import { Card, CardContent, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

const CardFormReceive = () => {
  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Typography gutterBottom variant="h4" component="div">
            Info receiver
          </Typography>
          {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ minWidth: '70px' }} variant="h6">
              Fullname :
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ minWidth: '70px' }} variant="h6">
              Address :
            </Typography>
          </Box> */}
          <TextField size="small" fullWidth sx={{ marginTop: '5px' }} label="Fullname" variant="outlined" />
          <TextField size="small" fullWidth sx={{ marginTop: '10px' }} label="Address" variant="outlined" />
          <TextField size="small" label="Note" fullWidth sx={{ marginTop: '10px' }} multiline rows={2} maxRows={2} />
        </CardContent>
      </Card>
    </>
  );
};

export default CardFormReceive;
