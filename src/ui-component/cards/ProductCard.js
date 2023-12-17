import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { formattingVND, truncateText } from "utils/helper";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const ProductCard = ({ product }) => {

    return (<>
        <Card sx={{
            borderRadius: '0', width: 165, border: '1px solid #ddd', paddingBottom: '5px', margin: '0px 5px 5px 0px', "&:hover": {
                // border: '1px solid #333',
                cursor: "pointer",
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
            }
        }}>
            <CardMedia
                sx={{ height: 80 }}
                image={product?.image ?? ''}
                title="image"
            />
            <CardContent sx={{ padding: '5px', minHeight: '50px' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} component="div">
                    {product?.name ? truncateText(product?.name, 74) : ''}
                </Typography>
            </CardContent>
            <Typography sx={{ margin: '0px 5px' }} variant="body2" color={"secondary"} component="div">
                {product?.price ? formattingVND(product?.price) : ''}
            </Typography>
            <Box sx={{ padding: '0px 3px', display: 'flex', justifyContent: 'space-between' }}>
                <IconButton sx={{ padding: '2px' }} aria-label="Heart">
                    <FavoriteBorderIcon sx={{fontSize:'18px'}} />
                </IconButton>
                <IconButton sx={{ padding: '2px' }} aria-label="Cart">
                    <ShoppingCartIcon sx={{fontSize:'18px'}} />
                </IconButton>
            </Box>
        </Card>
    </>);
}

export default ProductCard;