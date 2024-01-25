import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  CardActions,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Badge,
  Drawer
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconBell, IconShoppingCart } from '@tabler/icons';
import NotificationList from '../NotificationSection/NotificationList';
import ProductList from './ProductList';
import { useSelector } from 'react-redux';

// notification status options
const status = [
  {
    value: 'all',
    label: 'All Notification'
  },
  {
    value: 'new',
    label: 'New'
  },
  {
    value: 'unread',
    label: 'Unread'
  },
  {
    value: 'other',
    label: 'Other'
  }
];

// ==============================|| NOTIFICATION ||============================== //

const CartSection = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);

  const [open, setOpen] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const [value, setValue] = useState('');
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpenCartDrawer((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleChange = (event) => {
    if (event?.target.value) setValue(event?.target.value);
  };

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 2,
          [theme.breakpoints.down('md')]: {
            mr: 0
          }
        }}
      >
        <Badge
          badgeContent={customization?.cart?.length}
          sx={{
            '& .MuiBadge-badge': {
              color: 'white',
              backgroundColor: 'red'
            }
          }}
        >
          <ButtonBase sx={{ borderRadius: '12px' }}>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                transition: 'all .2s ease-in-out',
                background: theme.palette.secondary.light,
                color: theme.palette.secondary.dark,
                '&[aria-controls="menu-list-grow"],&:hover': {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light
                }
              }}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              color="inherit"
            >
              <IconShoppingCart stroke={1.5} size="1.3rem" />
            </Avatar>
          </ButtonBase>
        </Badge>
      </Box>
      <Drawer
        anchor={'right'}
        open={openCartDrawer}
        onClose={() => {
          setOpenCartDrawer(false);
        }}
      >
        <ProductList
          onCloseDrawer={() => {
            setOpenCartDrawer(false);
          }}
        />
      </Drawer>
    </>
  );
};

export default CartSection;
