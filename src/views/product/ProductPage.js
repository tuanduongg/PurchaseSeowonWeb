import {
  Box,
  Button,
  CardMedia,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PrintIcon from '@mui/icons-material/Print';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { formattingVND, truncateText, cssScrollBar } from 'utils/helper';
import AddIcon from '@mui/icons-material/Add';
import ModalAddProduct from 'ui-component/modal/add-product/AddProduct';

const columns = [
  {
    id: 'name',
    label: 'Product',
    // minWidth: 170,
    align: 'left'
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
    id: 'action',
    label: 'Action',
    // minWidth: 170,
    align: 'right'
  }
];

function createData(code, image, name, inventory, price, category) {
  return { code, image, name, inventory, price, category };
}
//158 character -> cut
const rows = [
  createData(60483973, 'https://vanphong-pham.com/wp-content/uploads/2021/10/giay-a4-double.jpg', 'Giấy A4', 2000, 12500, 'Văn phòng phẩm'),
  createData(327167434, 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 20, 12500, 'Đồ vệ sinh'),
  createData(37602103, 'https://cdn.fast.vn/tmp/20210610144411-c82-2.jpg', 'Kẹp giấy đầu tròn c32', 150, 12500, 'Quần áo'),
  createData(25475400, 'https://vanphong-pham.com/wp-content/uploads/2021/10/giay-a4-double.jpg', 'Giấy A4', 2000, 12500, 'Đồ điện'),
  createData(83019200, 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 200, 12500, 'Văn phòng phẩm'),
  createData(4857000, 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 400, 12500, 'Quần áo'),
  createData(126577691, 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 345, 12500, 'Sản xuất'),
  createData(126317000, 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 112, 12500, 'Văn phòng phẩm'),
  createData(67022000, 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 123, 12500, 'Đồ điện'),
  createData(67545757, 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 145, 12500, 'Quần áo'),
  createData(146793744, 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 204, 12500, 'Văn phòng phẩm'),
  createData(200962417, 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 500, 12500, 'Đồ vệ sinh'),
  createData(210147125, 'https://cdn.fast.vn/tmp/20210217090347-6.JPG', 'Kẹp giấy đầu tròn c32', 403, 12500, 'Văn phòng phẩmmarfF')
];

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

const ProductPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModalAddProduct, setOpenModalAddProduct] = useState(false);
  const openMenu = Boolean(anchorEl);

  const handleClickAddProduct = () => {
    setOpenModalAddProduct(true);
  };
  const onCloseModalAddProduct = () => {
    setOpenModalAddProduct(false);
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      <TableCell sx={{ padding: '5px' }}>
                        <Stack flexDirection={'row'} alignItems={'center'}>
                          <CardMedia
                            component={'image'}
                            sx={{ height: '50px', width: '50px', marginRight: '10px' }}
                            image={row?.image}
                            alt="image"
                          />
                          <Link
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
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ padding: '5px', textAlign: 'center' }}>{row?.inventory}</TableCell>
                      <TableCell sx={{ padding: '5px', textAlign: 'left' }}>{row?.price ? formattingVND(row?.price) : ''}</TableCell>
                      <TableCell sx={{ padding: '5px' }}>{row?.category}</TableCell>
                      <TableCell sx={{ padding: '5px', textAlign: 'right' }}>
                        {/* <Box sx={{ display: 'flex', textAlign: 'right' }}> */}
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
                        {/* </Box> */}
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
      <ModalAddProduct open={openModalAddProduct} fullScreen={false} handleClose={onCloseModalAddProduct} />
    </>
  );
};
export default ProductPage;
