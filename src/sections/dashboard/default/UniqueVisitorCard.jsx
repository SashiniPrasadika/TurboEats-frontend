import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import IncomeAreaChart from './IncomeAreaChart';

// ==============================|| TURBOEATS - ORDERS & CUSTOMERS ||============================== //

export default function UniqueVisitorCard() {
  const [view, setView] = useState('monthly'); // 'monthly' | 'weekly'

  return (
    <>
      <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid>
          <Typography variant="h5">Orders & Active Customers</Typography>
          <Typography variant="caption" color="text.secondary">
            Food orders placed and active users
          </Typography>
        </Grid>

        <Grid>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              size="small"
              onClick={() => setView('monthly')}
              color={view === 'monthly' ? 'primary' : 'secondary'}
              variant={view === 'monthly' ? 'outlined' : 'text'}
            >
              Month
            </Button>

            <Button
              size="small"
              onClick={() => setView('weekly')}
              color={view === 'weekly' ? 'primary' : 'secondary'}
              variant={view === 'weekly' ? 'outlined' : 'text'}
            >
              Week
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          {/* Orders & Customers area chart */}
          <IncomeAreaChart view={view} />
        </Box>
      </MainCard>
    </>
  );
}
