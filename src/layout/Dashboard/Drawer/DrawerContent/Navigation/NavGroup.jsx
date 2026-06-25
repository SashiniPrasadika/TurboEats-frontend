import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavItem from './NavItem';
import { useGetMenuMaster } from 'api/menu';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

export default function NavGroup({ item, setSelectedID, selectedID }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const navCollapse = item.children?.map((menuItem) => {
    if (menuItem.type === 'item') {
      return (
        <NavItem 
          key={menuItem.id} 
          item={menuItem} 
          level={1} 
          setSelectedID={setSelectedID}
          isParents={true}
        />
      );
    }
    return null;
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
}

NavGroup.propTypes = {
  item: PropTypes.object,
  setSelectedID: PropTypes.func,
  selectedID: PropTypes.string
};