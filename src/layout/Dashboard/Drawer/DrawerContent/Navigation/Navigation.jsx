import { useState } from 'react';
import { Box, List, Typography } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| NAVIGATION ||============================== //

const Navigation = () => {
  const [selectedID, setSelectedID] = useState('default');

  const navGroups = menuItem.items.map((item) => {
    // Check if item has children (it's a group)
    if (item.children) {
      return (
        <NavGroup 
          key={item.id} 
          item={item} 
          setSelectedID={setSelectedID} 
          selectedID={selectedID} 
        />
      );
    }
    
    // If it's a single item without children
    return (
      <List key={item.id} sx={{ py: 0 }}>
        <NavItem 
          item={item} 
          level={1} 
          setSelectedID={setSelectedID} 
          isParents={true}
        />
      </List>
    );
  });

  return (
    <Box sx={{ pt: 2 }}>
      <List sx={{ '& > :first-child': { mt: 0 } }}>
        {navGroups}
      </List>
    </Box>
  );
};

export default Navigation;