// assets
import { IconHome } from '@tabler/icons';
import { ConfigPath } from 'routes/DefinePath';

// constant
const icons = { IconHome  };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Home',
      type: 'item',
      url: ConfigPath.home,
      icon: icons.IconHome,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
