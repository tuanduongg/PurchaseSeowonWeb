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
import { useState } from 'react';
import { useEffect } from 'react';
import restApi from 'utils/restAPI';
import { DefineRouteApi } from 'DefineRouteAPI';

const ModalAddProduct = ({ open, handleClose, fullScreen, type, productProp, tittle }) => {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const onClose = (e, reason) => {
    if (reason != 'backdropClick') {
      setName('');
      setPrice('');
      setInventory('');
      setDescription('');
      setImages('');
      setCategory('');
      setProduct(null);
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
    console.log('res', res);
    if (res?.status === 200) {
      setCategories(res?.data);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //   {
  //     "productID": "DA025E2F-09AA-EE11-A1CA-04D9F5C9D2EB",
  //     "productName": "Giấy A4",
  //     "price": 120000,
  //     "inventory": 200,
  //     "description": "Kim Bấm số 10 Plus Đặc điểm: Kim bấm số 10 kích thước nhỏ sử dụng cho bấm kim số 10, có các nhãn hiệu để các bạn chọn lựa phù hợp cho dụng cụ bấm kim, phục vụ thuận tiện trong quá trình kẹp bấm giấy tờ tài liệu số lượng ít, định lượng giấy mỏng nhanh chóng và dễ dàng. Đóng gói: 20 hộp/ hộp lớn. Xuất xứ: Việt Nam Bảo quản: Tránh xa nguồn nhiệt và dầu mỡ. Công ty TNHH TM DV Văn Phòng Tổng Hợp Nam Phương chuyên cung cấp kim bấm các loại, giá cả hợp lý, hàng đảm bảo chất lượng",
  //     "categoryID": "688E8C27-09AA-EE11-A1CA-04D9F5C9D2EB",
  //     "isShow": true,
  //     "created_at": "2024-01-03T07:35:53.117Z",
  //     "created_by": null,
  //     "updated_at": "2024-01-03T07:24:53.117Z",
  //     "updated_by": null,
  //     "delete_at": null,
  //     "deleted_by": null,
  //     "images": [
  //         {
  //             "imageID": "D14195B9-ABAA-EE11-A1CA-04D9F5C9D2EB",
  //             "productID": "DA025E2F-09AA-EE11-A1CA-04D9F5C9D2EB",
  //             "url": "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
  //             "title": null,
  //             "isShow": "1"
  //         }
  //     ],
  //     "category": {
  //         "categoryID": "688E8C27-09AA-EE11-A1CA-04D9F5C9D2EB",
  //         "categoryName": "Văn phòng phẩm"
  //     }
  // }

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
                  InputProps={{ readOnly: type === 'VIEW' }}
                  fullWidth
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  size="small"
                  label="Product name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    InputProps={{ readOnly: type === 'VIEW' }}
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
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
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  InputProps={{ readOnly: type === 'VIEW' }}
                  fullWidth
                  size="small"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  label="Price"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  InputProps={{ readOnly: type === 'VIEW' }}
                  fullWidth
                  value={inventory}
                  onChange={(e) => {
                    setInventory(e.target.value);
                  }}
                  type="number"
                  size="small"
                  label="Inventory"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{ readOnly: type === 'VIEW' }}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  fullWidth
                  label="Description"
                  multiline
                  minRows={4}
                  maxRows={4}
                />
              </Grid>
              <Grid item xs={12}>
                {type !== 'VIEW' && (
                  <Typography variant="h5" sx={{ marginBottom: '5px' }}>
                    Upload Image(optional)
                  </Typography>
                )}
                <ListImageProduct type={type} images={images} />
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
