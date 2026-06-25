// project import
import dashboard from './dashboard';
import users from './users';
import restaurants from './restaurants';
import orders from './orders';
import content from './content';
import customer from './customer'; // Add this import

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, users, restaurants, orders, content, customer] // Add customer to the array
};

export default menuItems;