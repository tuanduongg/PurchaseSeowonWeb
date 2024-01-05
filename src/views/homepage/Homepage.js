import { useEffect, useState } from 'react';

// material-ui
import {
  Grid,
  Typography,
  Box,
  TablePagination,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  MenuItem,
  Select
} from '@mui/material';
import { gridSpacing } from 'store/constant';
import ProductCard from 'ui-component/cards/ProductCard';
import SearchIcon from '@mui/icons-material/Search';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import SubCard from 'ui-component/cards/SubCard';
import ModalDetailProduct from 'ui-component/modal/detail-product/ModalDetailProduct';
import Loader from 'ui-component/Loader';
import Loadable from 'ui-component/Loadable';
import { isMobile } from 'utils/helper';
import { DefineRouteApi } from 'DefineRouteAPI';
import restApi from 'utils/restAPI';
import CusomLoading from 'ui-component/loading/CustomLoading';

// ==============================|| DEFAULT Homepage ||============================== //

const Homepage = () => {
  // const [isLoading, setLoading] = useState(true);
  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModalDetailProd, setOpenModalDetailProd] = useState(false);
  const [productSelected, setProductSelected] = useState({});
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [total, setTotal] = useState(0);
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const onShowDetailProduct = (product) => {
    setProductSelected(product);
    setOpenModalDetailProd(true);
  };

  const handleCloseModelDetailPro = () => {
    setOpenModalDetailProd(false);
    setProductSelected({});
  };

  const getAllProduct = async () => {
    setLoading(true);
    const obj = { page, rowsPerPage, search, categoryID: category };
    const url = DefineRouteApi.getProductPubic;
    const res = await restApi.post(url, obj);
    if (res?.status === 200) {
      const data = res?.data;
      setTotal(data?.count);
      setListProduct(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getAllCategory = async () => {
    const res = await restApi.get(DefineRouteApi.getAllCategory);
    if (res?.status === 200) {
      setCategories(res?.data);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAllProduct();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [page, rowsPerPage, category, search, 500]);

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <CusomLoading open={loading} />
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Typography variant="h4">List product</Typography>
          {/* <SearchSection /> */}
          <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 1, width: '20ch' }} variant="standard" size="small">
              <InputLabel>Category</InputLabel>
              <Select value={category} label="Category" onChange={handleChange}>
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {categories?.map((item, index) => (
                  <MenuItem key={index} value={item?.categoryID}>
                    {item?.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: '25ch' }} size="small" variant="standard">
              <InputLabel>Search</InputLabel>
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
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: '95%', margin: 'auto' }}>
            <Box sx={{ display: 'flex' }}>
              {listProduct?.map((item, index) => (
                <ProductCard onShowDetail={onShowDetailProduct} product={item} key={index} />
              ))}
            </Box>
          </Box>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Grid>
      <ModalDetailProduct
        product={productSelected}
        open={openModalDetailProd}
        fullScreen={isMobile() ? true : false}
        handleClose={handleCloseModelDetailPro}
      />
    </>
  );
};

export default Homepage;
