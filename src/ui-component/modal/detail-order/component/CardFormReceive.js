import { Card, CardContent, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

const CardFormReceive = ({
  fullname,
  address,
  note,
  onchangeFullname,
  onchangeAddress,
  onchangeNote,
  validateFullname,
  validateAddress,
  validateNote
}) => {
  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Typography gutterBottom variant="h4" component="div">
            Info receiver
          </Typography>
          <TextField
            error={validateFullname?.error}
            helperText={validateFullname?.message}
            size="small"
            fullWidth
            sx={{ marginTop: '5px' }}
            value={fullname}
            onChange={onchangeFullname}
            label="Full name"
            variant="outlined"
          />
          <TextField
            helperText={validateAddress?.message}
            error={validateAddress?.error}
            size="small"
            fullWidth
            sx={{ marginTop: '10px' }}
            label="Address"
            value={address}
            onChange={onchangeAddress}
            variant="outlined"
          />
          <TextField
            error={validateNote?.error}
            helperText={validateNote?.message}
            size="small"
            label="Note"
            fullWidth
            sx={{ marginTop: '10px' }}
            multiline
            rows={2}
            value={note}
            onChange={onchangeNote}
            maxRows={2}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default CardFormReceive;
