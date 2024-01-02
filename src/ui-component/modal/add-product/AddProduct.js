import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import { formattingVND } from 'utils/helper';
import { IconShoppingCart } from '@tabler/icons';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import ListImageProduct from './component/ListImageProduct';

const ModalAddProduct = ({ open, handleClose, fullScreen }) => {
  const onClose = (e, reason) => {
    if (reason != 'backdropClick') {
      handleClose();
    }
  };

  return (
    <>
      <Dialog maxWidth={'sm'} fullScreen={fullScreen} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle fontSize={'20px'} sx={{ padding: '10px' }}>
            Add new product
          </DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent sx={{ overflowY: 'hidden' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth size="small" label="Product name" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select size="small" label="Category">
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth size="small" label="Price" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth type="number" size="small" label="Inventory" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Description" multiline minRows={4} maxRows={4} />
              </Grid>
              <Grid item xs={12}>
                <ListImageProduct />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="contained" color="primary" autoFocus endIcon={<SaveIcon />} onClick={onClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalAddProduct;
