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
import { formattingVND, truncateText, cssScrollBar, checkIsApprover, isMobile, stickyColumn } from 'utils/helper';
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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ModalAddUser from 'ui-component/modal/add-user/ModalAddUser';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import ModalDepartment from 'ui-component/modal/department/ModalDepartment';
import { useNavigate } from 'react-router';
import { ConfigPath } from 'routes/DefinePath';

const columns = [
  {
    id: 'STT',
    label: 'No',
    // minWidth: 170,
    align: 'center'
  },
  {
    id: 'name',
    label: 'Username',
    minWidth: 200,
    align: 'left',
    sx: {
      ...stickyColumn,
      top: 0,
      zIndex: 20
    }
  },
  { id: 'Department', label: 'Department', minWidth: 140, align: 'left' },
  {
    id: 'Manager',
    label: "Manager Dep't",

    align: 'center'
  },
  {
    id: 'action',
    label: '',
    // minWidth: 170,
    align: 'right'
  }
];

const UserPage = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [listProduct, setListProduct] = useState([]);
  const [titleModal, setTitleModal] = useState('');
  const [typeModal, setTypeModal] = useState('ADD');
  const [total, setTotal] = useState(0);
  const [userSelect, setUserSelect] = useState(null);
  const [openModall, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [contentAlert, setContentAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('success');
  const [openModalDeparment, setOpenModalDepartment] = useState(false);
  const navigate = useNavigate();

  const openMenu = Boolean(anchorEl);

  const onCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(+event.target.value);
  };

  const handleClickAddProduct = () => {
    setTitleModal('Add new user');
    setTypeModal('ADD');
    setOpenModal(true);
  };
  const onCloseModalAddProduct = () => {
    setUserSelect(null);
    setOpenModal(false);
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
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const getAllUser = async () => {
    setLoading(true);
    const obj = { page, rowsPerPage, search };
    const url = DefineRouteApi.getAllUser;
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
  useEffect(() => {
    let check = checkIsApprover();
    if (!check) {
      navigate(ConfigPath.home);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAllUser();
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [search, page, rowsPerPage, 500]);

  const handleClickEditProduct = () => {
    if (userSelect) {
      setAnchorEl(null);
      setTitleModal(`Edit user`);
      setTypeModal('EDIT');
      setOpenModal(true);
    }
  };
  const handleChangePublic = async (row) => {
    const res = await restApi.post(DefineRouteApi.changePublicProduct, { productID: row?.productID });
    if (res?.status === 200) {
      getAllUser();
    }
  };

  const onAfterSaved = (res) => {
    const msg = {
      success: typeModal !== 'EDIT' ? 'Add new user successful!' : 'Update user successful!',
      fail: typeModal !== 'EDIT' ? 'Add new user fail!' : 'Update user fail!'
    };
    if (res?.status === 200) {
      getAllUser();
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

  const onCloseModalDepartment = () => {
    setOpenModalDepartment(false);
  };
  const handleClickDepartment = () => {
    setOpenModalDepartment(true);
  };
  const afterSave = (res, textSucces) => {
    if (res?.status === 200) {
      setTypeAlert('success');
      setContentAlert(textSucces);
      setOpenAlert(true);
    } else {
      setTypeAlert('error');
      setContentAlert(res?.data?.message || 'Update fail!');
      setOpenAlert(true);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Box>
        <Typography variant="h4">User</Typography>
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
          <Box sx={{ marginBottom: { xs: '10px', sm: '0px' }, textAlign: { xs: 'right', sm: '' } }}>
            <Button
              onClick={handleClickAddProduct}
              variant="contained"
              size={'small'}
              sx={{ mr: 1 }}
              startIcon={<AddIcon stroke={1.5} size="1.3rem" />}
            >
              Add user
            </Button>
            <Button
              onClick={handleClickDepartment}
              variant="contained"
              size={'small'}
              startIcon={<CoPresentIcon stroke={1.5} size="1.3rem" />}
            >
              Department
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
                        <TableCell sx={{ padding: '5px', textAlign: 'left', ...stickyColumn }}>{row?.username}</TableCell>
                        <TableCell sx={{ padding: '5px', textAlign: 'left' }}>{row?.department?.departName}</TableCell>
                        <TableCell sx={{ padding: '5px', textAlign: 'center' }}>
                          {row?.isManager ? (
                            <Tooltip title="This user is manager of department.">
                              <CheckCircleOutlineIcon color="success" />
                            </Tooltip>
                          ) : null}
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
                                setUserSelect(row);
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
      <ModalAddUser
        fullScreen={isMobile() ? true : false}
        userSelect={userSelect}
        onDeleteErr={onDeleteImageErr}
        tittle={titleModal}
        type={typeModal}
        open={openModall}
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
      <ModalDepartment
        fullScreen={isMobile() ? true : false}
        open={openModalDeparment}
        afterSave={afterSave}
        handleClose={onCloseModalDepartment}
      />
    </>
  );
};
export default UserPage;
