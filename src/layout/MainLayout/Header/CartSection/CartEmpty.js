const { Box, Typography, CardMedia } = require('@mui/material');
import emptyImage from '../../../../assets/images/cart/empty-cart.png';
const CartEmpty = () => {
  return (
    <>
      <Box sx={{ width: '100%', height: '80%', textAlign: 'center' }}>
        <img src={emptyImage} height={200} alt="logo" />
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          Your cart is empty
        </Typography>
      </Box>
    </>
  );
};
export default CartEmpty;
