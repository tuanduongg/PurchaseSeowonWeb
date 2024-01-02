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
import { isMobile, truncateText } from 'utils/helper';
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
// ==============================|| Oderlist page ||============================== //

const columns = [
  { id: 'code', label: 'Code' },
  {
    id: 'image',
    label: 'Product',
    // minWidth: 170,
    align: 'left'
  },
  {
    id: 'name',
    label: '',
    // minWidth: 170,
    align: 'center'
  },
  { id: 'create_at', label: 'Create at', minWidth: 140 },
  {
    id: 'status',
    label: 'Status',

    align: 'left'
  },
  {
    id: 'action',
    label: 'Action',
    // minWidth: 170,
    align: 'left'
  }
];

function createData(code, create_at, image, name, status) {
  return { code, create_at, image, name, status };
}
//158 character -> cut
const rows = [
  createData(
    1324171354,
    '08:05 12/12/2023',
    'https://cdn.fast.vn/tmp/20210217090347-6.JPG',
    'Kẹp giấy đầu tròn c32;Kẹp giấy đầu tròn C82 LOẠI LỚN;Kim bấm số 10 Plus;Kẹp giấy đầu tròn c32',
    'Pending'
  ),
  createData(60483973, '09:58 10/12/2023', 'https://vanphong-pham.com/wp-content/uploads/2021/10/giay-a4-double.jpg', 'Giấy A4', 'success'),
  createData(327167434, '07:58 06/12/2023', 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 'pending'),
  createData(37602103, '11:58 05/12/2023', 'https://cdn.fast.vn/tmp/20210610144411-c82-2.jpg', 'Kẹp giấy đầu tròn c32', 'warning'),
  createData(25475400, '06:40 07/12/2023', 'https://vanphong-pham.com/wp-content/uploads/2021/10/giay-a4-double.jpg', 'Giấy A4', 'pending'),
  createData(83019200, '10:20 08/12/2023', 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 'success'),
  createData(4857000, '10:10 09/12/2023', 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 'pending'),
  createData(126577691, '04:58 12/12/2023', 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 'success'),
  createData(126317000, '07:30 15/12/2023', 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 'pending'),
  createData(67022000, '02:45 18/12/2023', 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 'pending'),
  createData(67545757, '06:58 01/12/2023', 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 'pending'),
  createData(146793744, '11:58 02/12/2023', 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 'pending'),
  createData(200962417, '03:33 04/12/2023', 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 'pending'),
  createData(210147125, '10:20 03/12/2023', 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 'pending')
];
const getStatusChip = (content, color) => {
  let temp = color;
  if (content?.toLowerCase() === 'pending') {
    temp = 'primary';
  }
  return <Chip size="small" label={content} color={temp} />;
};
const OrderList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const [openModalDetail, setOpenModalDetail] = React.useState(false);

  
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

  const onShowDetailOrder = () => {
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
      titleProp: 'Notification',
      content: 'Are you sure delete this order?',
      onClickYes: () => {
        onDelete();
      }
    });
  };

  return (
    <>
      <Box sx={{}}>
        <Typography variant="h4">Order list</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl sx={{ m: 1, width: '15ch' }} variant="standard" size="small">
              <InputLabel id="demo-select-small-label">Status</InputLabel>
              <Select labelId="demo-select-small-label" id="demo-select-small" label="Status">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: '25ch' }} size="small" variant="standard">
              <InputLabel htmlFor="standard-adornment-search">Search</InputLabel>
              <Input
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
              <CustomDatePicker label={'From date'} />
            </Box>
            <Box>
              {' '}
              <Typography sx={{ margin: '15px 0px 0px 15px' }} variant="h4">
                ~
              </Typography>
            </Box>
            <Box ml={2}>
              <CustomDatePicker disableFuture={true} label={'To date'} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: 'white' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      <TableCell sx={{ padding: '10px' }}>
                        {/* <Typography variant="body2" color="primary">
                      </Typography> */}
                        #{row?.code}
                        {/* </Link> */}
                      </TableCell>
                      <TableCell sx={{ padding: '5px' }}>
                        <CardMedia component={'image'} sx={{ height: '50px', width: '50px' }} image={row?.image} alt="image" />
                      </TableCell>
                      <TableCell sx={{ padding: '5px' }}>
                        <Link
                          onClick={onShowDetailOrder}
                          underline="hover"
                          color={'warning'}
                          sx={{
                            '&:hover': {
                              cursor: 'pointer'
                            }
                          }}
                        >
                          {row?.name ? truncateText(row?.name, 155) : ''}
                        </Link>
                      </TableCell>
                      <TableCell sx={{ padding: '5px' }}>{row?.create_at}</TableCell>
                      <TableCell sx={{ padding: '5px' }}>{getStatusChip(row?.status, row?.status)}</TableCell>
                      <TableCell sx={{ padding: '5px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton size="small">
                            <PrintIcon fontSize="20px" />
                          </IconButton>
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
                          {/* <IconButton size="small">
                            <IconEdit />
                          </IconButton>
                          <IconButton size="small">
                            <IconTrash />
                          </IconButton> */}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
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
        <MenuItem disableRipple onClick={handleClickEdit}>
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
      <DetailOrder open={openModalDetail} fullScreen={isMobile() ? true : false} handleClose={hanleCloseModalDetail} />
    </>
  );
};

export default OrderList;
