// assets
import { IconHome, IconAlignBoxBottomLeft, IconUserCircle, IconBrandAirtable, IconUserCheck } from '@tabler/icons';
import { ConfigPath } from 'routes/DefinePath';

// constant
const icons = { IconHome, IconAlignBoxBottomLeft, IconUserCircle, IconBrandAirtable, IconUserCheck };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: ConfigPath.home,
  title: '',
  type: 'group',
  children: [
    {
      id: ConfigPath.home,
      title: 'Home',
      type: 'item',
      url: ConfigPath.home,
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: ConfigPath.orderList,
      title: 'Order',
      type: 'item',
      url: ConfigPath.orderList,
      icon: icons.IconAlignBoxBottomLeft,
      breadcrumbs: false
    },
    {
      id: ConfigPath.productPage,
      title: 'Product',
      type: 'item',
      url: ConfigPath.productPage,
      icon: icons.IconBrandAirtable,
      breadcrumbs: false
    },
    // {
    //   id: ConfigPath.acceptorPage,
    //   title: 'Acceptor',
    //   type: 'item',
    //   url: ConfigPath.acceptorPage,
    //   icon: icons.IconUserCheck,
    //   breadcrumbs: false
    // }
    // {
    //   id: ConfigPath.productPage,
    //   title: 'Approver',
    //   type: 'item',
    //   url: ConfigPath.productPage,
    //   icon: icons.IconUserCheck,
    //   breadcrumbs: false
    // }
    // {
    //   id: 'profile',
    //   title: 'Profile',
    //   type: 'item',
    //   url: ConfigPath.profilePage,
    //   icon: icons.IconUserCircle,
    //   breadcrumbs: false
    // }
  ]
};

export default dashboard;
