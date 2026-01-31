import { useState } from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
import SaleReportCard from 'sections/dashboard/default/SaleReportCard';
import OrdersTable from 'sections/dashboard/default/OrdersTable';

// icons
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

// avatars
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

export default function DashboardDefault() {
  const [orderMenuAnchor, setOrderMenuAnchor] = useState(null);
  const [analyticsMenuAnchor, setAnalyticsMenuAnchor] = useState(null);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Header */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">TurboEats Dashboard</Typography>
      </Grid>

      {/* KPI Cards */}
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce
          title="Total Orders"
          count="24,580"
          percentage={12.4}
          extra="1,240"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce
          title="Active Customers"
          count="8,430"
          percentage={8.2}
          extra="520"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce
          title="Delivered Orders"
          count="21,960"
          percentage={5.6}
          extra="890"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce
          title="Total Revenue"
          count="186,420"
          percentage={15.1}
          extra="12,300"
        />
      </Grid>

      {/* Charts */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <UniqueVisitorCard title="Daily Orders Overview" />
      </Grid>

      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Typography variant="h5">Weekly Revenue</Typography>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Typography variant="h6" color="text.secondary">
              This Week
            </Typography>
            <Typography variant="h3">18,750</Typography>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* Recent Orders */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <Typography variant="h5">Recent Food Orders</Typography>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>

      {/* Analytics */}
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Typography variant="h5">Delivery Performance</Typography>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0 }}>
            <ListItemButton divider>
              <ListItemText primary="On-Time Delivery Rate" />
              <Typography variant="h5">92%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Order Cancellation Rate" />
              <Typography variant="h5">3.1%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Customer Satisfaction" />
              <Typography variant="h5">4.6 ★</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid>

      {/* Transactions */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <SaleReportCard title="Top Restaurants Sales" />
      </Grid>

      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Typography variant="h5">Order Transactions</Typography>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ px: 0 }}>
            <ListItem divider>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'success.lighter', color: 'success.main' }}>
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Order #TE1023" secondary="Pizza Hut • Today" />
              <Typography>28.50</Typography>
            </ListItem>

            <ListItem divider>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}>
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Order #TE1024" secondary="KFC • Yesterday" />
              <Typography>19.90</Typography>
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'error.lighter', color: 'error.main' }}>
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Order #TE1025" secondary="Burger King • 2 days ago" />
              <Typography>15.75</Typography>
            </ListItem>
          </List>
        </MainCard>

        {/* Support */}
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h5">Customer Support</Typography>
            <AvatarGroup>
              <Avatar src={avatar1} />
              <Avatar src={avatar2} />
              <Avatar src={avatar3} />
              <Avatar src={avatar4} />
            </AvatarGroup>
            <Button variant="contained">Contact Support</Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
