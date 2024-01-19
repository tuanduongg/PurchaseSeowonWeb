const { Box, Typography, CardMedia } = require('@mui/material');
import emptyImage from '../assets/images/cart/empty-product.png';
// import emptyImage from '../../../../assets/images/cart/empty-product.png';
const ProductEmpty = () => {
  return (
    <>
      <Box sx={{ width: '100%', height: '80%', textAlign: 'center' }}>
        <img src={emptyImage} height={150} alt="logo" />
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          No result found.
        </Typography>
      </Box>
    </>
  );
};
export default ProductEmpty;
