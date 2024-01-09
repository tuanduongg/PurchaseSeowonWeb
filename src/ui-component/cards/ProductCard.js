import { Button, Card, CardActions, CardContent, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { formattingVND, truncateText } from 'utils/helper';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { SET_BORDER_RADIUS, UPDATE_CART_ITEM } from 'store/actions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import config from '../../config';

const ProductCard = ({ product, onShowDetail, afterAddToCart }) => {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);

  const handleClickAddToCart = () => {
    const cart = customization?.cart;
    const item = { ...product, quantity: 1 };
    dispatch({ type: UPDATE_CART_ITEM, product: item });
    afterAddToCart();
  };
  return (
    <>
      {/* <Card
        sx={{
          borderRadius: '0',
          width: { xs: '48%', md: '16%' },
          border: '1px solid #ddd',
          paddingBottom: '5px',
          margin: '0px 5px 5px 0px',
          '&:hover': {
            border: '1px solid #0054a6',
            cursor: 'pointer',
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
          }
        }}
      > */}
      <Card
        sx={{
          borderRadius: '0',
          width: { xs: '100%', md: '100%' },
          border: '1px solid #ddd',
          // paddingBottom: '5px',
          // margin: '0px 5px 5px 0px',
          '&:hover': {
            border: '1px solid #0054a6',
            cursor: 'pointer',
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
          }
        }}
      >
        <CardMedia
          sx={{ height: 100, backgroundSize: 'contain' }}
          image={product?.images ? config.apiImage + product?.images[0]?.url : ''}
          title={product?.productName}
        />
        <CardContent
          onClick={() => {
            onShowDetail(product);
          }}
          sx={{ padding: '5px' }}
        >
          <Typography textAlign={'center'} variant="h6" sx={{ fontWeight: 'bold', minHeight: '40px' }} component="div">
            {product?.productName ? truncateText(product?.productName, 74) : ''}
          </Typography>
        </CardContent>
        {/* <Typography sx={{ margin: '0px 5px' }} variant="body2" color={'secondary'} component="div">
          {product?.price ? formattingVND(product?.price) : ''}
        </Typography> */}
        <Typography textAlign={'center'} variant="body2" sx={{ color: '#0054a6' }} component="div">
          {product?.price ? formattingVND(product?.price) : ''}
        </Typography>
        <Box sx={{ borderTop: '1px solid #ddd', marginTop: '10px', display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
          <Box
            onClick={() => {
              onShowDetail(product);
            }}
            sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', borderRight: '0.5px solid #ddd', width: '50%' }}
          >
            <VisibilityIcon sx={{ fontSize: '18px', color: '#0054a6' }} />
            <Typography variant="body2" sx={{ fontSize: '13px', '&:hover': { color: '#0054a6' } }} component="div">
              View detail
            </Typography>
          </Box>
          <Box
            onClick={handleClickAddToCart}
            sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', borderLeft: '0.5px solid #ddd', width: '50%' }}
          >
            <ShoppingCartIcon sx={{ fontSize: '18px', color: '#0054a6' }} />
            <Typography variant="body2" sx={{ fontSize: '13px', '&:hover': { color: '#0054a6' } }} component="div">
              Add to cart
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default ProductCard;
