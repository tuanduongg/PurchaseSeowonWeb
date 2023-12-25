// assets
import { IconBrandChrome, IconHelp, IconUserCircle, IconAlignBoxBottomLeft, IconLogout } from '@tabler/icons';
import { ConfigPath } from 'routes/DefinePath';

// constant
const icons = { IconBrandChrome, IconHelp, IconUserCircle, IconAlignBoxBottomLeft, IconLogout };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    // { title: 'Order list', type: 'item', url: ConfigPath.orderList, icon: icons.IconAlignBoxBottomLeft, breadcrumbs: false },
    {
      id: ConfigPath.profilePage,
      title: 'Profile',
      type: 'item',
      url: ConfigPath.profilePage,
      icon: icons.IconUserCircle,
      breadcrumbs: false
    },
    {
      id: ConfigPath.logout,
      title: 'Logout',
      type: 'item',
      url: ConfigPath.logout,
      icon: icons.IconLogout,
      breadcrumbs: false
    }
    // {
    //   id: 'documentation',
    //   title: 'Documentation',
    //   type: 'item',
    //   url: 'https://codedthemes.gitbook.io/berry/',
    //   icon: icons.IconHelp,
    //   external: true,
    //   target: true
    // }
  ]
};

export default other;
