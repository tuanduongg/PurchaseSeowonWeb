// assets
import { IconHome, IconAlignBoxBottomLeft, IconUserCircle, IconBrandAirtable } from '@tabler/icons';
import { ConfigPath } from 'routes/DefinePath';

// constant
const icons = { IconHome, IconAlignBoxBottomLeft, IconUserCircle, IconBrandAirtable };

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
      title: 'Order list',
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
    }
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
