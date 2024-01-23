import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { ConfigPath } from './DefinePath';
// import ProductPage from 'views/product/ProductPage';

// dashboard routing
const Homepage = Loadable(lazy(() => import('views/homepage/Homepage.js')));

// utilities routing

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const OrderList = Loadable(lazy(() => import('views/order-list/OrderList')));
const ProductPage = Loadable(lazy(() => import('views/product/ProductPage')));
const ProfilePage = Loadable(lazy(() => import('views/profile/ProfilePage')));
const UserPage = Loadable(lazy(() => import('views/user/UserPage')));
const AcceptorPage = Loadable(lazy(() => import('views/acceptor/AcceptorPage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: ConfigPath.home,
      element: <Homepage />
    },
    {
      path: ConfigPath.orderList,
      element: <OrderList />
    },
    {
      path: ConfigPath.samplePage,
      element: <SamplePage />
    },
    {
      path: ConfigPath.profilePage,
      element: <ProfilePage />
    },
    {
      path: ConfigPath.productPage,
      element: <ProductPage />
    },
    {
      path: ConfigPath.userPage,
      element: <UserPage />
    },
    {
      path: ConfigPath.acceptorPage,
      element: <AcceptorPage />
    }
  ]
};

export default MainRoutes;
