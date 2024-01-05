import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import navigation from 'menu-items';
import { drawerWidth } from 'store/constant';
import { CHECK_LOGIN, SET_MENU } from 'store/actions';

// assets
import { IconChevronRight } from '@tabler/icons';
import { useEffect } from 'react';
import { getCookie } from 'utils/helper';
import config from '../../config';
import { ConfigPath } from 'routes/DefinePath';
import { useState } from 'react';
import restApi from 'utils/restAPI';
import { DefineRouteApi } from 'DefineRouteAPI';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '10px'
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '10px'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '10px',
    marginRight: '10px'
  }
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };
  const customization = useSelector((state) => state.customization);
  const location = useLocation();
  const navigate = useNavigate();

  // const [isLogin, setIsLogin] = useState(false);
  // const checkToken = async () => {
  //   const response = await restApi.get(DefineRouteApi.profile);
  //   if (response?.status === 200) {
  //     setIsLogin(true);
  //     // dispatch({ type: CHECK_LOGIN, isLogin: true });
  //   }
  // };
  // if (!customization?.isLogin) {
  //   return <Navigate to={ConfigPath.login} state={{ from: location }} />;
  // }
  const checkToken = async () => {
    const response = await restApi.get(DefineRouteApi.profile);
    if (response?.status !== 200) {
      dispatch({ type: CHECK_LOGIN, isLogin: false });
      navigate(ConfigPath.login);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      {/* main content */}
      <Main theme={theme} open={leftDrawerOpened}>
        {/* breadcrumb */}
        <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
        <Outlet />
      </Main>
      <Customization />
    </Box>
  );
};

export default MainLayout;
