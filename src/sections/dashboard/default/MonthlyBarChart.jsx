// material-ui
import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';

// daily revenue in Sri Lankan Rupees (LKR)
const revenueData = [18500, 21400, 17600, 15200, 23800, 31500, 28900];
const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ==============================|| FOOD DELIVERY REVENUE BAR CHART (LKR) ||============================== //

export default function MonthlyBarChart() {
  const theme = useTheme();

  // ✅ Force LKR formatter
  const valueFormatter = (value) => `Rs. ${value.toLocaleString('en-LK')}`;

  return (
    <BarChart
      hideLegend
      height={380}
      series={[
        {
          data: revenueData,
          label: 'Daily Revenue (LKR)',
          valueFormatter // ✅ THIS is the key
        }
      ]}
      xAxis={[
        {
          data: xLabels,
          scaleType: 'band',
          tickSize: 7,
          disableLine: true,
          categoryGapRatio: 0.4
        }
      ]}
      yAxis={[
        {
          position: 'none'
        }
      ]}
      slotProps={{
        bar: { rx: 6, ry: 6 },
        tooltip: {
          trigger: 'item'
        }
      }}
      axisHighlight={{ x: 'none' }}
      margin={{ left: 20, right: 20 }}
      colors={[theme.vars.palette.success.main]}
      sx={{
        '& .MuiBarElement-root:hover': { opacity: 0.7 },
        '& .MuiChartsAxis-root.MuiChartsAxis-directionX .MuiChartsAxis-tick': {
          stroke: 'transparent'
        }
      }}
    />
  );
}
