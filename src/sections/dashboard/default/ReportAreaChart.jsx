// material-ui
import { useTheme } from '@mui/material/styles';

// charts
import { chartsGridClasses, LineChart } from '@mui/x-charts';

// ==============================|| FOOD DELIVERY REPORT AREA CHART ||============================== //

// Monthly completed orders
const data = [120, 180, 95, 210, 165, 230, 190];
const labels = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function ReportAreaChart() {
  const theme = useTheme();

  return (
    <LineChart
      hideLegend
      grid={{ horizontal: true }}
      xAxis={[
        {
          data: labels,
          scaleType: 'point',
          disableLine: true,
          tickSize: 7
        }
      ]}
      yAxis={[
        {
          position: 'none',
          tickMaxStep: 50
        }
      ]}
      series={[
        {
          id: 'completed-orders',
          label: 'Completed Orders',
          data,
          showMark: false,
          color: theme.vars.palette.success.main,
          area: true
        }
      ]}
      height={340}
      margin={{ top: 30, bottom: 25, left: 20, right: 20 }}
      sx={{
        '& .MuiLineElement-root': {
          strokeWidth: 2
        },
        '& .MuiAreaElement-root': {
          opacity: 0.25
        },
        [`& .${chartsGridClasses.line}`]: {
          strokeDasharray: '4 4',
          stroke: theme.vars.palette.divider
        },
        '& .MuiChartsAxis-root.MuiChartsAxis-directionX .MuiChartsAxis-tick': {
          stroke: 'transparent'
        }
      }}
    />
  );
}
