import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { ConfigPath } from './DefinePath';

// dashboard routing
const Homepage = Loadable(lazy(() => import('views/homepage/Homepage.js')));

// utilities routing

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const OrderList = Loadable(lazy(() => import('views/order-list/OrderList')));

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
    }
  ]
};

export default MainRoutes;
