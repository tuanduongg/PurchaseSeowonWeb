import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { formattingVND, truncateText } from 'utils/helper';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { SET_BORDER_RADIUS, UPDATE_CART_ITEM } from 'store/actions';

const ProductCard = ({ product, onShowDetail,afterAddToCart }) => {
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
      <Card
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
      >
        <CardMedia
          onClick={() => {
            onShowDetail(product);
          }}
          sx={{ height: 100 }}
          image={product?.images ? product?.images[0]?.url : ''}
          title={product?.productName}
        />
        <CardContent
          onClick={() => {
            onShowDetail(product);
          }}
          sx={{ padding: '5px', minHeight: '50px' }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }} component="div">
            {product?.productName ? truncateText(product?.productName, 74) : ''}
          </Typography>
        </CardContent>
        {/* <Typography sx={{ margin: '0px 5px' }} variant="body2" color={'secondary'} component="div">
          {product?.price ? formattingVND(product?.price) : ''}
        </Typography> */}
        <Box sx={{ padding: '0px 3px', display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ margin: '0px 5px' }} variant="body2" color={'secondary'} component="div">
            {product?.price ? formattingVND(product?.price) : ''}
          </Typography>
          {/* <IconButton sx={{ padding: '2px' }} aria-label="Heart">
            <FavoriteBorderIcon sx={{ fontSize: '18px' }} />
          </IconButton> */}
          <IconButton onClick={handleClickAddToCart} sx={{ padding: '2px' }} aria-label="Cart">
            <ShoppingCartIcon sx={{ fontSize: '18px' }} />
          </IconButton>
        </Box>
      </Card>
    </>
  );
};

export default ProductCard;
