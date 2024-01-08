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
import { formattingVND, truncateText, cssScrollBar } from 'utils/helper';
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

const columns = [
  {
    id: 'STT',
    label: 'STT',
    // minWidth: 170,
    align: 'center'
  },
  {
    id: 'name',
    label: 'Product',
    // minWidth: 170,
    align: 'center'
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
  const openMenu = Boolean(anchorEl);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
  const onClickAcceptDelete = () => {
    alert('click');
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
    setTitleModal(`${row?.productName}`);
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

  return (
    <>
      <Box>
        <Typography variant="h4">Product</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl sx={{ m: 1, width: '25ch' }} size="small" variant="standard">
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
          <Box>
            <Button onClick={handleClickAddProduct} variant="contained" size={'small'} startIcon={<AddIcon stroke={1.5} size="1.3rem" />}>
              Add product
            </Button>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: 'white' }}>
          <TableContainer sx={{ maxHeight: 440, ...cssScrollBar }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {listProduct.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.productID}>
                      <TableCell sx={{ padding: '5px', textAlign: 'center' }}>{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell sx={{ padding: '5px' }}>
                        <Stack flexDirection={'row'} alignItems={'center'}>
                          <CardMedia
                            component={'image'}
                            sx={{ height: '50px', width: '50px', marginRight: '10px' }}
                            image={row?.images?.[0]?.url ?? ''}
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
                                cursor: 'pointer'
                              }
                            }}
                          >
                            {row?.productName ? truncateText(row?.productName, 155) : ''}
                          </Link>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ padding: '5px', textAlign: 'center' }}>{row?.inventory}</TableCell>
                      <TableCell sx={{ padding: '5px', textAlign: 'left' }}>{row?.price ? formattingVND(row?.price) : ''}</TableCell>
                      <TableCell sx={{ padding: '5px' }}>{row?.category?.categoryName}</TableCell>
                      <TableCell sx={{ padding: '5px' }}>
                        <Tooltip title={row?.isShow ? 'This product hidden' : 'This product is showing'}>
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
                })}
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
        productProp={productSelect}
        tittle={titleModal}
        type={typeModal}
        open={openModalAddProduct}
        fullScreen={false}
        handleClose={onCloseModalAddProduct}
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
        <MenuItem disableRipple onClick={handleClickDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <CustomLoading open={loading} />
    </>
  );
};
export default ProductPage;
