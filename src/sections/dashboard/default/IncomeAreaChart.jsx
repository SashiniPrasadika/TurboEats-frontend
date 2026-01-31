import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { LineChart } from '@mui/x-charts/LineChart';

// project imports
import { withAlpha } from 'utils/colorUtils';

// labels
const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// data
const monthlyOrders = [820, 910, 1200, 1100, 980, 1350, 1240, 1500, 1320, 1180, 1600, 1700];
const weeklyOrders = [120, 140, 135, 180, 210, 260, 240];

// revenue in LKR
const monthlyRevenue = [12400, 13800, 18200, 17100, 15900, 20100, 19200, 22800, 21000, 19800, 24500, 26800];
const weeklyRevenue = [1800, 2100, 1950, 2600, 3200, 4100, 3800];

// legend
function Legend({ items, onToggle }) {
  return (
    <Stack direction="row" gap={2} alignItems="center" justifyContent="center" mt={2.5} mb={1.5}>
      {items.map((item) => (
        <Stack
          key={item.label}
          direction="row"
          gap={1.25}
          alignItems="center"
          sx={{ cursor: 'pointer' }}
          onClick={() => onToggle(item.label)}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: item.visible ? item.color : 'text.secondary',
              borderRadius: '50%'
            }}
          />
          <Typography variant="body2">{item.label}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}

// ==============================|| TURBOEATS - INCOME AREA CHART (LKR) ||============================== //

export default function IncomeAreaChart({ view }) {
  const theme = useTheme();

  const [visibility, setVisibility] = useState({
    Orders: true,
    Revenue: true
  });

  const labels = view === 'monthly' ? monthlyLabels : weeklyLabels;
  const ordersData = view === 'monthly' ? monthlyOrders : weeklyOrders;
  const revenueData = view === 'monthly' ? monthlyRevenue : weeklyRevenue;

  const toggleVisibility = (label) => {
    setVisibility((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // ✅ Sri Lankan Rupees formatter
  const valueFormatterLKR = (value) => `Rs. ${value.toLocaleString('en-LK')}`;

  const visibleSeries = [
    {
      data: ordersData,
      label: 'Orders',
      id: 'orders',
      area: true,
      showMark: false,
      color: theme.vars.palette.primary.main,
      visible: visibility.Orders,
      valueFormatter: (value) => value.toLocaleString('en-LK')
    },
    {
      data: revenueData,
      label: 'Revenue (LKR)',
      id: 'revenue',
      area: true,
      showMark: false,
      color: theme.vars.palette.success.main,
      visible: visibility.Revenue,
      valueFormatter: valueFormatterLKR
    }
  ];

  return (
    <>
      <LineChart
        hideLegend
        grid={{ horizontal: true, vertical: false }}
        xAxis={[
          {
            scaleType: 'point',
            data: labels,
            tickSize: 7,
            disableLine: true
          }
        ]}
        yAxis={[
          {
            tickSize: 7,
            disableLine: true,
            valueFormatter: valueFormatterLKR // ✅ fixes axis currency
          }
        ]}
        height={450}
        margin={{ top: 40, bottom: -5, right: 20, left: 5 }}
        series={visibleSeries
          .filter((series) => series.visible)
          .map((series) => ({
            type: 'line',
            data: series.data,
            label: series.label,
            id: series.id,
            area: series.area,
            showMark: series.showMark,
            color: series.color,
            stroke: series.color,
            strokeWidth: 2,
            valueFormatter: series.valueFormatter
          }))}
        sx={{
          '& .MuiChartsGrid-line': {
            strokeDasharray: '4 4',
            stroke: theme.vars.palette.divider
          },
          '& .MuiAreaElement-series-orders': {
            fill: "url('#ordersGradient')",
            opacity: 0.8
          },
          '& .MuiAreaElement-series-revenue': {
            fill: "url('#revenueGradient')",
            opacity: 0.8
          },
          '& .MuiChartsAxis-root.MuiChartsAxis-directionX .MuiChartsAxis-tick': {
            stroke: 'transparent'
          },
          '& .MuiChartsAxis-root.MuiChartsAxis-directionY .MuiChartsAxis-tick': {
            stroke: 'transparent'
          }
        }}
      >
        <defs>
          <linearGradient id="ordersGradient" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor={withAlpha(theme.vars.palette.primary.main, 0.4)} />
            <stop offset="90%" stopColor={withAlpha(theme.vars.palette.background.default, 0.4)} />
          </linearGradient>

          <linearGradient id="revenueGradient" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor={withAlpha(theme.vars.palette.success.main, 0.4)} />
            <stop offset="90%" stopColor={withAlpha(theme.vars.palette.background.default, 0.4)} />
          </linearGradient>
        </defs>
      </LineChart>

      <Legend items={visibleSeries} onToggle={toggleVisibility} />
    </>
  );
}

Legend.pro
