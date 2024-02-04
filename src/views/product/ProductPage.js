import {
  Box,
  Button,
  CardMedia,
  Chip,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PrintIcon from '@mui/icons-material/Print';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { formattingVND, truncateText, cssScrollBar, checkIsApprover, isExcelFile, stickyColumn, isMobile } from 'utils/helper';
import AddIcon from '@mui/icons-material/Add';
import ModalAddProduct from 'ui-component/modal/add-product/AddProduct';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import restApi from 'utils/restAPI';
import { DefineRouteApi } from 'DefineRouteAPI';
import { useEffect } from 'react';
import { ShowAlert, ShowQuestion } from 'utils/confirm';
import CustomLoading from 'ui-component/loading/CustomLoading';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import config from '../../config';
import CustomAlert from 'ui-component/alert/CustomAlert';
import Loader from 'ui-component/Loader';
import ProductEmpty from 'ui-component/ProductEmpty';
import { useNavigate } from 'react-router';
import { ConfigPath } from 'routes/DefinePath';
import CategoryIcon from '@mui/icons-material/Category';
import ModalCategory from 'ui-component/modal/category/ModalCategory';
import { useRef } from 'react';
import UploadIcon from '@mui/icons-material/Upload';

const columns = [
  {
    id: 'STT',
    label: 'No',
    // minWidth: 170,
    align: 'center'
  },
  {
    id: 'name',
    label: 'Product',
    minWidth: 200,
    align: 'left',
    sx: {
      ...stickyColumn,
      top: 0,
      zIndex: 20
    }
  },
  { id: 'inventory', label: 'Inventory', minWidth: 140, align: 'center' },
  {
    id: 'Price',
    label: 'Price',

    align: 'left'
  },
  {
    id: 'Category',
    label: 'Category',

    align: 'left'
  },
  {
    id: 'isShow',
    label: '',
    // minWidth: 170,
    align: 'center'
  },
  {
    id: 'action',
    label: '',
    // minWidth: 170,
    align: 'right'
  }
];

const ProductPage = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [listProduct, setListProduct] = useState([]);
  const [titleModal, setTitleModal] = useState('');
  const [typeModal, setTypeModal] = useState('ADD');
  const [total, setTotal] = useState(0);
  const [productSelect, setProductSelect] = useState(null);
  const [openModalAddProduct, setOpenModalAddProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [contentAlert, setContentAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('success');
  const [categories, setCategories] = useState([]);
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const navigate = useNavigate();
  const openMenu = Boolean(anchorEl);
  const inputRef = useRef();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    let check = checkIsApprover();
    if (!check) {
      navigate(ConfigPath.home);
    }
  }, []);
  const onCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(+event.target.value);
  };

  const handleClickAddProduct = () => {
    setTitleModal('Add new product');
    setTypeModal('ADD');
    setOpenModalAddProduct(true);
  };
  const onCloseModalAddProduct = () => {
    setProductSelect(null);
    setOpenModalAddProduct(false);
  };
  const onClickAcceptDelete = async () => {
    if (productSelect) {
      const data = { productID: productSelect?.productID };
      const res = await restApi.post(DefineRouteApi.deleteProduct, data);
    }
  };
  const handleClickDelete = () => {
    ShowQuestion({
      icon: 'warning',
      titleProp: 'Delete Product',
      content: 'Do you want to delete this product?',
      onClickYes: () => {
        onClickAcceptDelete();
      }
    });
  };
  const getAllCategory = async () => {
    const res = await restApi.get(DefineRouteApi.getAllCategory);
    if (res?.status === 200) {
      setCategories(res?.data);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const getAllProduct = async () => {
    setLoading(true);
    const obj = { page, rowsPerPage, search };
    const url = DefineRouteApi.getAllProduct;
    const res = await restApi.post(url, obj);
    if (res?.status === 200) {
      setLoading(false);
      const data = res?.data;
      setTotal(data?.count);
      setListProduct(data?.data);
    } else {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   getAllProduct();
  // }, []);

  const handleViewProduct = (row) => {
    setProductSelect(row);
    setTitleModal(`Product detail`);
    setTypeModal('VIEW');
    setOpenModalAddProduct(true);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAllProduct();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, page, rowsPerPage, 500]);

  const handleClickEditProduct = () => {
    if (productSelect) {
      setAnchorEl(null);
      setTitleModal(`Edit product`);
      setTypeModal('EDIT');
      setOpenModalAddProduct(true);
    }
  };
  const handleChangePublic = async (row) => {
    const res = await restApi.post(DefineRouteApi.changePublicProduct, { productID: row?.productID });
    if (res?.status === 200) {
      getAllProduct();
    }
  };
  const handleClickPublic = (row) => {
    ShowQuestion({
      icon: 'warning',
      titleProp: `${row?.isShow ? 'Hidden' : 'Show'} Product`,
      content: `Do you want to ${row?.isShow ? 'hidden' : 'show'} this product?`,
      onClickYes: () => {
        handleChangePublic(row);
      }
    });
  };

  const onAfterSaveCategory = (res, text) => {
    if (res?.status === 200) {
      getAllCategory();
      setTypeAlert('success');
      setContentAlert(text);
    } else {
      setTypeAlert('error');
      setContentAlert(res?.data?.message || 'Fail to update category!');
    }
    setOpenAlert(true);
  };
  const onAfterSaved = (res) => {
    const msg = {
      success: typeModal !== 'EDIT' ? 'Add new product successful!' : 'Update product successful!',
      fail: typeModal !== 'EDIT' ? 'Add new product fail!' : 'Update product fail!'
    };
    if (res?.status === 200) {
      getAllProduct();
      setTypeAlert('success');
      setContentAlert(msg.success);
    } else {
      setTypeAlert('error');
      setContentAlert(res?.data?.message || msg.fail);
    }
    setOpenAlert(true);
  };
  const onDeleteImageErr = (message) => {
    setTypeAlert('error');
    setContentAlert(message || 'Delete image fail!');
    setOpenAlert(true);
  };
  const onClickCategory = () => {
    setOpenModalCategory(true);
  };
  const onCloseModalCategory = () => {
    setOpenModalCategory(false);
  };
  const handleChangeFiles = async (e) => {
    let file = e.target.files[0];
    e.target.value = '';
    if (isExcelFile(file)) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      const res = await restApi.post(DefineRouteApi.upLoadExcel, formData);
      if (res?.status === 200) {
        setTypeAlert('success');
        setContentAlert('Upload product successful!');
        getAllProduct();
      } else {
        setTypeAlert('error');
        setContentAlert(res?.data?.message || 'Upload product fail!');
      }
      setLoading(false);
    } else {
      file = null;
      setTypeAlert('error');
      setContentAlert('Invalid type file!');
    }
    setOpenAlert(true);
  };
  return (
    <>
      {loading && <Loader />}
      <Box>
        <Typography variant="h4">Product</Typography>
        <Box sx={{ display: { xs: 'block', sm: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl sx={{ m: 1, width: { sm: '25ch', xs: '100%' } }} size="small" variant="standard">
              <InputLabel htmlFor="standard-adornment-search">Search</InputLabel>
              <Input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
                type="text"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: { xs: '10px', sm: '0px' } }}>
            <Button
              onClick={() => {
                inputRef?.current?.click();
              }}
              sx={{ mr: 1 }}
              variant="contained"
              size={'small'}
              startIcon={<UploadIcon stroke={1.5} size="1.3rem" />}
            >
              Upload excel
            </Button>
            <Button
              onClick={handleClickAddProduct}
              sx={{ mr: 1 }}
              variant="contained"
              size={'small'}
              startIcon={<AddIcon stroke={1.5} size="1.3rem" />}
            >
              Add product
            </Button>
            <Button onClick={onClickCategory} variant="contained" size={'small'} startIcon={<CategoryIcon stroke={1.5} size="1.3rem" />}>
              Category
            </Button>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: 'white' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} sx={column?.sx} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {listProduct?.length > 0 ? (
                  listProduct.map((row, index) => {
                    return (
                      <TableRow role="checkbox" tabIndex={-1} key={row.productID}>
                        <TableCell sx={{ padding: '5px', textAlign: 'center' }}>{index + 1 + page * rowsPerPage}</TableCell>
                        <TableCell
                          sx={{
                            padding: '5px',
                            ...stickyColumn,
                            
                          }}
                        >
                          <Stack flexDirection={'row'} alignItems={'center'}>
                            <CardMedia
                              component={'image'}
                              sx={{ height: '50px', width: '50px', marginRight: '10px' }}
                              image={config.apiImage + row?.images?.[0]?.url ?? ''}
                              alt="image"
                            />
                            <Link
                              onClick={() => {
                                handleViewProduct(row);
                              }}
                              underline="hover"
                              color={'warning'}
                              sx={{
                                '&:hover': {
                                  cursor: 'pointer',
                                  color: '#1e88e5'
                                }
                              }}
                            >
                              {row?.productName ? truncateText(row?.productName, 155) : ''}
                            </Link>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ padding: '5px', textAlign: 'center', color: row?.inventory < 1 ? 'red' : '' }}>
                          {row?.inventory}
                        </TableCell>
                        <TableCell sx={{ padding: '5px', textAlign: 'left' }}>{row?.price ? formattingVND(row?.price) : ''}</TableCell>
                        <TableCell sx={{ padding: '5px' }}>{row?.category?.categoryName}</TableCell>
                        <TableCell sx={{ padding: '5px' }}>
                          <Tooltip title={!row?.isShow ? 'This product hidden' : 'This product is showing'}>
                            <IconButton
                              onClick={() => {
                                handleClickPublic(row);
                              }}
                            >
                              {row?.isShow ? <VisibilityIcon sx={{ color: config.COLOR_MAIN }} /> : <VisibilityOffIcon />}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell sx={{ padding: '5px', textAlign: 'right' }}>
                          <Tooltip title="Menu">
                            <IconButton
                              aria-label="more"
                              id="long-button"
                              aria-controls={openMenu ? 'long-menu' : undefined}
                              aria-expanded={openMenu ? 'true' : undefined}
                              aria-haspopup="true"
                              onClick={(e) => {
                                setProductSelect(row);
                                handleOpenMenu(e);
                              }}
                            >
                              <MoreVertIcon fontSize="20px" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns?.length + 1}>
                      <ProductEmpty />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
      <ModalAddProduct
        categories={categories}
        onDeleteErr={onDeleteImageErr}
        productProp={productSelect}
        tittle={titleModal}
        type={typeModal}
        open={openModalAddProduct}
        fullScreen={isMobile() ? true : false}
        handleClose={onCloseModalAddProduct}
        afterSaved={onAfterSaved}
      />
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem disableRipple onClick={handleClickEditProduct}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit
        </MenuItem>
      </Menu>
      <CustomLoading open={loading} />
      <CustomAlert open={openAlert} type={typeAlert} content={contentAlert} handleClose={onCloseAlert} />
      <input type="file" onChange={handleChangeFiles} accept=".xls, .xlsx" ref={inputRef} hidden />
      <ModalCategory
        getAll={getAllCategory}
        afterSave={onAfterSaveCategory}
        categories={categories}
        open={openModalCategory}
        handleClose={onCloseModalCategory}
        fullScreen={isMobile() ? true : false}
      />
    </>
  );
};
export default ProductPage;
