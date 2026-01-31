import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import SalesChart from 'sections/dashboard/SalesChart';

// order revenue filter options
const filters = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| TURBOEATS - ORDER REVENUE REPORT ||============================== //

export default function SaleReportCard() {
  const [value, setValue] = useState('today');

  return (
    <>
      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Grid>
          <Typography variant="h5">Order Revenue Report</Typography>
          <Typography variant="caption" color="text.secondary">
            Earnings from completed food deliveries
          </Typography>
        </Grid>

        <Grid>
          <TextField
            size="small"
            select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            slotProps={{
              htmlInput: { sx: { py: 0.75, fontSize: '0.875rem' } }
            }}
          >
            {filters.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Revenue / Orders chart */}
      <SalesChart filter={value} />
    </>
  );
}
