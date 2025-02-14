import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
import { useState } from 'react';
import { useEffect } from 'react';
import { checkIsApprover, hiddenRouteUser } from 'utils/helper';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const theme = useTheme();
  const [checkShow, setCheckShow] = useState(false);
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    let check = checkIsApprover();
    setCheckShow(check);
    // setListItem(items);
    // console.log('items', items);
  }, []);
  const items = item.children?.map((menu) => {
    if (hiddenRouteUser.includes(menu.id) && !checkShow) {
      return null;
    } else {
      switch (menu.type) {
        case 'collapse':
          return <NavCollapse key={menu.id} menu={menu} level={1} />;
        case 'item':
          return <NavItem key={menu.id} item={menu} level={1} />;
        default:
          return (
            <Typography key={menu.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    }
  });

  // menu list collapse & items

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
              {item.title}
              {item.caption && (
                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
