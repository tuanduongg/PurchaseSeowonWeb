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
  FormHelperText,
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

import { formattingVND, formattingVNDInput } from 'utils/helper';
import { IconShoppingCart } from '@tabler/icons';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import ListImageProduct from './component/ListImageProduct';
import { useState } from 'react';
import { useEffect } from 'react';
import restApi from 'utils/restAPI';
import { DefineRouteApi } from 'DefineRouteAPI';
import { ConfigPath } from 'routes/DefinePath';

const initValidate = { err: false, msg: '' };

const ModalAddProduct = ({ open, handleClose, fullScreen, type, productProp, tittle }) => {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [validateName, setValidateName] = useState(initValidate);
  const [category, setCategory] = useState('');
  const [validateCategory, setValidateCategory] = useState(initValidate);
  const [price, setPrice] = useState(0);
  const [validatePrice, setValidatePrice] = useState(initValidate);
  const [inventory, setInventory] = useState('');
  const [validateInventory, setValidateInventory] = useState(initValidate);
  const [description, setDescription] = useState('');
  const [validateDescription, setValidateDescription] = useState(initValidate);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [typeShowImage, setTypeShowImage] = useState('');

  const onClose = (e, reason) => {
    if (reason != 'backdropClick') {
      setName('');
      setPrice('');
      setInventory('');
      setDescription('');
      setImages('');
      setCategory('');
      setProduct(null);
      setValidateName(initValidate);
      setValidateCategory(initValidate);
      setValidatePrice(initValidate);
      setValidateInventory(initValidate);
      setValidateDescription(initValidate);
      handleClose();
    }
  };
  useEffect(() => {
    if (productProp) {
      setName(productProp?.productName);
      setPrice(productProp?.price);
      setInventory(productProp?.inventory);
      setDescription(productProp?.description);
      setImages(productProp?.images);
      setCategory(productProp?.category?.categoryID);
    }
  }, [productProp]);

  const getAllCategory = async () => {
    const res = await restApi.get(DefineRouteApi.getAllCategory);
    if (res?.status === 200) {
      setCategories(res?.data);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  const handleOnSave = async () => {
    const dataSend = JSON.stringify({
      name,
      price,
      description,
      inventory,
      category
    });
    var formData = new FormData();
    formData.append('data', dataSend);
    images.map((file) => {
      formData.append('files', file);
    });
    const res = await restApi.post(DefineRouteApi.addProduct, formData);
    console.log('res', res);
  };
  const handleClickSave = () => {
    let isErr = false;
    if (name?.trim() === '') {
      setValidateName({ err: true, msg: 'Product name is required' });
      isErr = true;
    }
    if (description?.trim() === '') {
      setValidateDescription({ err: true, msg: 'Description is required' });
      isErr = true;
    }
    if (category?.trim() === '') {
      setValidateCategory({ err: true, msg: 'Category is required' });
      isErr = true;
    }

    let priceNum = parseInt(price?.trim());
    let invenNum = parseInt(inventory?.trim());

    if (priceNum < 1) {
      setValidatePrice({ err: true, msg: 'Price must be more than or equal 1' });
      isErr = true;
    }
    if (invenNum < 0) {
      setValidateInventory({ err: true, msg: 'Inventory must be more than or equal 0' });
      isErr = true;
    }
    if (!isErr) {
      handleOnSave();
    }
  };

  const handleRemoveImage = (index) => {
    const arr = [...images];
    arr.splice(index, 1);
    setImages(arr);
  };

  const handleChangeInputFiles = (files) => {
    if (files?.length > 0) {
      const arrFiles = [];
      for (var i = 0; i < files.length; i++) {
        files[i].createObjectURL = URL.createObjectURL(files[i]);
        arrFiles.push(files[i]);
      }
      setImages((pre) => [...pre, ...arrFiles]);
    }
  };

  return (
    <>
      <Dialog
        maxWidth={'sm'}
        sx={{ minHeight: '90vh' }}
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle fontSize={'20px'} sx={{ padding: '10px' }}>
            {tittle}
          </DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent sx={{ overflowY: 'hidden' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Typography variant="h5" sx={{ marginBottom: '10px' }}>
              Info Product
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  error={validateName.err}
                  helperText={validateName.msg}
                  InputProps={{ readOnly: type === 'VIEW' }}
                  fullWidth
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (validateName?.err) {
                      setValidateName(initValidate);
                    }
                  }}
                  size="small"
                  label="Product name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl error={validateCategory.err} size="small" fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    InputProps={{ readOnly: type === 'VIEW' }}
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      if (validateCategory?.err) {
                        setValidateCategory(initValidate);
                      }
                    }}
                    size="small"
                    label="Category"
                  >
                    {categories?.map((item, index) => (
                      <MenuItem key={index} disabled={type == 'VIEW' && item?.categoryID !== category} value={item?.categoryID}>
                        {item?.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                  {validateCategory.err && <FormHelperText>{validateCategory.msg}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={validatePrice.err}
                  helperText={validatePrice.msg}
                  InputProps={{ readOnly: type === 'VIEW' }}
                  fullWidth
                  size="small"
                  value={price}
                  type="text"
                  onChange={(e) => {
                    // const number = parseFloat(e.target.value).toFixed(3);
                    setPrice(e.target.value);
                    if (validatePrice?.err) {
                      setValidatePrice(initValidate);
                    }
                  }}
                  label="Price"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={validateInventory.err}
                  helperText={validateInventory.msg}
                  InputProps={{ readOnly: type === 'VIEW' }}
                  fullWidth
                  value={inventory}
                  onChange={(e) => {
                    setInventory(e.target.value);
                    if (validateInventory?.err) {
                      setValidateInventory(initValidate);
                    }
                  }}
                  type="number"
                  size="small"
                  label="Inventory"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={validateDescription.err}
                  helperText={validateDescription.msg}
                  InputProps={{ readOnly: type === 'VIEW' }}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (validateDescription?.err) {
                      setValidateDescription(initValidate);
                    }
                  }}
                  fullWidth
                  label="Description"
                  multiline
                  minRows={3}
                  maxRows={3}
                />
              </Grid>
              <Grid item xs={12}>
                {type !== 'VIEW' && (
                  <Typography variant="h5" sx={{ marginBottom: '5px' }}>
                    Upload Image(optional)
                  </Typography>
                )}
                <ListImageProduct
                  handleRemoveImage={handleRemoveImage}
                  afterChangeFiles={handleChangeInputFiles}
                  type={type}
                  imagesProp={images}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="contained" color="primary" autoFocus endIcon={<SaveIcon />} onClick={handleClickSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalAddProduct;
