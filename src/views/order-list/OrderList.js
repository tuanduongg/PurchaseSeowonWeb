import * as React from 'react';
// material-ui
import {
  Box,
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
  Select,
  TableBody,
  Typography
} from '@mui/material';

// project imports
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconEdit, IconTrash } from '@tabler/icons';
import { OrderStatus, formatDateFromDB, isMobile, truncateText, stickyColumn } from 'utils/helper';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DetailOrder from 'ui-component/modal/detail-order/DetailOrder';
import { LIST_DAY, LIST_MONTH, LIST_YEAR } from './OderList.service';
import CustomDatePicker from './component/CutomDatePicker';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ShowQuestion } from 'utils/confirm';
import CommitIcon from '@mui/icons-material/Commit';
import PrintIcon from '@mui/icons-material/Print';
import restApi from 'utils/restAPI';
import { DefineRouteApi } from 'DefineRouteAPI';
import { useEffect } from 'react';
import CustomLoading from 'ui-component/loading/CustomLoading';
import Loader from 'ui-component/Loader';
import { format, max } from 'date-fns';
import config from '../../config';
import ProductEmpty from 'ui-component/ProductEmpty';
// ==============================|| Oderlist page ||============================== //

const columns = [
  { id: 'stt', label: 'STT', align: 'center' },
  {
    id: 'code',
    label: 'Order code',
    minWidth: 150,
    sx: {
      ...stickyColumn,
      top: 0,
      zIndex: 20,
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      },
      '&.Mui-selected': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      }
    }
  },
  {
    id: 'name',
    label: 'Product',
    minWidth: 200,
    align: 'left'
  },
  { id: 'create_at', label: 'Create at', minWidth: 70 },
  { id: 'order_by', label: 'Order by', align: 'center' },
  {
    id: 'status',
    label: 'Status',
    align: 'center'
  },
  {
    id: 'action',
    label: '',
    // minWidth: 170,
    align: 'right'
  }
];

const concatNameProduct = (orderDetails) => {
  if (orderDetails) {
    let temp = '';
    orderDetails.map((item, index) => {
      temp += item?.product?.productName + ';';
    });
    return temp.slice(0, -1);
  }
  return '';
};
// const getStatusChip = (content, color) => {
//   let temp = color;
//   if (content?.toLowerCase() === 'pending') {
//     temp = 'primary';
//   }
//   return <Chip size="small" label={content ?? ''} color={temp} />;
// };
const getCurrentDate = () => {
  return new Date();
};
const getMonthAgo = () => {
  var today = new Date();
  var priorDate = new Date(new Date().setDate(today.getDate() - 30));
  return priorDate;
};
// nếu là người bt -> manager bộ phận -> acctor 1,2,3...
//nếu manager -> acceptor 1, acceptor 2
//acceptor1 -> acceptor 2....
//nếu acceptor cuối -> k là manager
// neeus acceptor là manager thì sao?

const getStatusChip2 = (order, userStatus, maxLevel) => {
  const level = order?.status?.level;
  let text = '';
  let color = '';
  if (level === 0) {
    text = 'Cancel';
    color = 'error';
  } else if (level === 1) {
    text = 'New';
    color = 'secondary';
  } else if (level === maxLevel) {
    text = 'Done';
    color = 'success';
  } else {
    const userStr = localStorage.getItem(config.DATA_USER);
    let userObj = {};
    if (userStr) {
      userObj = JSON.parse(userStr);
      if (userObj?.isManager || userStatus) {
        if (order?.created_by === userObj?.username) {
          text = 'My Order';
          color = 'secondary';
        } else {
          if (userStatus && level >= userStatus?.level) {
            text = 'Accepted';
            color = 'info';
          } else {
            if (userObj?.isManager && level === 3 && !userStatus) {
              text = 'Accepted';
              color = 'info';
            } else {
              text = 'New';
              color = 'secondary';
            }
          }
        }
      } else {
        text = 'Process';
        color = 'info';
      }
    }
  }

  return <Chip label={text} color={color} size="small" />;
};
const getStatusChip = (order, userStatus, maxLevel) => {
  const level = order?.status?.level;

  const userStr = localStorage.getItem(config.DATA_USER);
  let userObj = {};
  if (userStr) {
    userObj = JSON.parse(userStr);
  }

  // neesu la nguoi duyet nhu quan li bo phan, acceptor...
  //dax duyet,new, canel
  //neu la nguoi bt(new,process,cancel)
  //neu la
  if (order) {
    let color = '';
    let text = '';
    //nguoi duyet: new,acceptor,cancel
    //nguoi bt: new,processing,cancel
    switch (level) {
      case 1: //new
        color = 'secondary';
        text = 'New';

        break;
      // case 5: //new
      //   color = 'secondary';
      //   text = 'New';

      //   break;
      // case maxLevel: //done
      //   color = 'success';
      //   text = 'DONE';
      // break;
      case 0: //cancel
        color = 'error';
        text = 'Cancel';
        break;

      default:
        {
          color = 'info';
          if (userStatus) {
            // neeus la ng duyet
            //nguwoif dc duyet
            if (order?.status?.level >= userStatus?.level) {
              text = 'Accepted';
            } else {
              color = 'secondary';
              text = 'New';
            }
          } else {
            // neu khong la ng duyet
            if (userObj?.isManager) {
              // if (order?.created_by === userObj?.username) {
              //   text = 'New';
              // } else {
              //   text = 'Process';
              // }
              text = 'Process';
              // text = order?.status?.level >= 1 ? 'Accepted 2' : 'Process';
            } else {
              // ng kh duoc duyet
              text = 'Process';
            }
          }
        }
        break;
    }
    if (level === maxLevel) {
      return <Chip label={'Done'} color={'success'} size="small" />;
    }
    return <Chip label={text} color={color} size="small" />;
  }
  return null;
};
const OrderList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [orderSelect, setOrderSelect] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [total, setTotal] = React.useState(0);
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [toDate, setToDate] = React.useState(new Date());
  const [fromDate, setFromDate] = React.useState(getMonthAgo());
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [status, setStatus] = React.useState('');
  const [allStatus, setAllStatus] = React.useState([]);
  const [userStatus, setUserStatus] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [openModalDetail, setOpenModalDetail] = React.useState(false);
  const [maxLevel, setMaxLevel] = React.useState(0);

  const getAllOrder = async () => {
    setLoading(true);
    const data = { rowsPerPage, page, search, fromDate, toDate, status };
    const res = await restApi.post(DefineRouteApi.getOrders, data);
    if (res?.status === 200) {
      setTotal(res?.data?.count);
      setOrders(res?.data?.data);
      setUserStatus(res?.data?.userStatus);
      setLoading(false);
    }
  };
  const getAllStatus = async () => {
    const res = await restApi.get(DefineRouteApi.allStatus);
    if (res?.status === 200) {
      const data = res?.data;
      setAllStatus(data);
      const maxLevel = data.reduce((max, status) => (status.level > max ? status.level : max), data[0].level);
      setMaxLevel(maxLevel);
    }
  };

  const afterChangeStatus = () => {
    setOpenModalDetail(false);
    getAllOrder();
  };

  useEffect(() => {
    getAllStatus();
  }, []);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAllOrder();
    }, 900);
    return () => clearTimeout(timeoutId);
  }, [page, rowsPerPage, search, fromDate, toDate, status, 500]);

  // useEffect(() => {
  //   getAllOrder();
  // }, []);
  const hanleCloseModalDetail = () => {
    setOpenModalDetail(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onShowDetailOrder = (row) => {
    setOrderSelect(row);
    setOpenModalDetail(true);
  };

  const handleOpenMenu = (event, row) => {
    setSelectedRow(row);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    alert('clicked handleClickEdit');
  };
  const onDelete = () => {
    alert('delete');
  };
  const handleClickDelete = () => {
    ShowQuestion({
      titleProp: 'Delete',
      content: 'Are you sure delete this order?',
      onClickYes: () => {
        onDelete();
      }
    });
  };
  const onChangeStartDate = (newValue) => {
    setFromDate(newValue);
  };

  const onChangeEndDate = (newValue) => {
    setToDate(newValue);
  };
  return (
    <>
      {loading && <Loader />}
      <CustomLoading open={loading} />
      <Box sx={{}}>
        <Typography variant="h4">Order</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <FormControl sx={{ m: 1, width: '15ch' }} variant="standard" size="small">
              <InputLabel id="demo-select-small-label">Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                label="Status"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.values(OrderStatus).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            <FormControl sx={{ m: 1, width: { xs: '130px', md: '25ch' } }} size="small" variant="standard">
              <InputLabel htmlFor="standard-adornment-search">Search</InputLabel>
              <Input
                placeholder="Search by order code..."
                onChange={(e) => {
                  const { value } = e.target;
                  setSearch(value);
                  setPage(0);
                }}
                value={search}
                id="standard-adornment-search"
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

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <CustomDatePicker disableFuture={true} value={fromDate} onChange={onChangeStartDate} label={'From date'} />
            </Box>
            <Box>
              {' '}
              <Typography sx={{ margin: '15px 0px 0px 15px' }} variant="h4">
                ~
              </Typography>
            </Box>
            <Box ml={2}>
              <CustomDatePicker disableFuture={true} value={toDate} onChange={onChangeEndDate} label={'To date'} />
            </Box>
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
                {orders?.length > 0 ? (
                  orders?.map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell sx={{ padding: '10px', textAlign: 'center' }}>{index + 1 + page * rowsPerPage}</TableCell>
                        <TableCell sx={{ padding: '10px', textAlign: 'left', ...stickyColumn }}>
                          <Link
                            onClick={() => onShowDetailOrder(row)}
                            underline="hover"
                            color={'primary'}
                            sx={{
                              '&:hover': {
                                cursor: 'pointer'
                              }
                            }}
                          >
                            {row?.code}
                          </Link>
                        </TableCell>
                        {/* <TableCell sx={{ padding: '5px' }}>
                        <CardMedia component={'image'} sx={{ height: '50px', width: '50px' }} image={row?.image} alt="image" />
                      </TableCell> */}
                        <TableCell sx={{ padding: '5px' }}>
                          {row?.orderDetail ? truncateText(concatNameProduct(row.orderDetail), 155) : ''}
                        </TableCell>
                        <TableCell sx={{ padding: '5px' }}>{formatDateFromDB(row?.created_at)}</TableCell>
                        <TableCell sx={{ padding: '5px', textAlign: 'center' }}>{row?.created_by}</TableCell>
                        <TableCell sx={{ padding: '5px', textAlign: 'center' }}>{getStatusChip2(row, userStatus, maxLevel)}</TableCell>
                        <TableCell sx={{ padding: '5px', textAlign: 'right' }}>
                          {/* <Box sx={{ display: 'flex', alignItems: 'right' }}> */}
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={openMenu ? 'long-menu' : undefined}
                            aria-expanded={openMenu ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(e) => {
                              handleOpenMenu(e, row);
                            }}
                          >
                            <MoreVertIcon fontSize="20px" />
                          </IconButton>
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
        <MenuItem disableRipple onClick={() => {}}>
          <ListItemIcon>
            <PrintIcon />
          </ListItemIcon>
          Print
        </MenuItem>
        {/* <MenuItem disableRipple onClick={handleClickEdit}>
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
        </MenuItem> */}
      </Menu>
      <DetailOrder
        maxLevel={maxLevel}
        allStatus={allStatus}
        userStatus={userStatus}
        isView={true}
        orderSelect={orderSelect}
        open={openModalDetail}
        fullScreen={isMobile() ? true : false}
        handleClose={hanleCloseModalDetail}
        afterChangeStatus={afterChangeStatus}
      />
    </>
  );
};

export default OrderList;
