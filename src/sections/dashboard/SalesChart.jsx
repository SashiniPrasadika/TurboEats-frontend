import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { BarChart } from '@mui/x-charts';

// project imports
import MainCard from 'components/MainCard';
import { withAlpha } from 'utils/colorUtils';

// ==============================|| TURBOEATS - SALES COLUMN CHART ||============================== //

export default function SalesChart() {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [seriesVisibility, setSeriesVisibility] = useState({
    'Orders Revenue': true,
    'Delivery Costs': true
  });

  const [highlightedItem, setHighlightedItem] = useState(null);

  const toggleSeriesVisibility = (seriesLabel) => {
    setSeriesVisibility((prev) => ({ ...prev, [seriesLabel]: !prev[seriesLabel] }));
  };

  const handleHighlight = (seriesId) => {
    setHighlightedItem(seriesId ? { seriesId } : null);
  };

  const valueFormatter = (value) => `$${value}k`;

  const primaryColor = theme.vars.palette.primary.main;
  const primaryLightColor = theme.vars.palette.primary.lighter;
  const warningColor = theme.vars.palette.warning.main;
  const warningLightColor = theme.vars.palette.warning.lighter;

  const labels = ['07 Jun', '08 Jun', '09 Jun', '10 Jun', '11 Jun', '12 Jun', '13 Jun'];

  const initialSeries = [
    {
      id: 'RevenueMain',
      data: [180, 90, 135, 114, 120, 200, 145],
      stack: 'revenue',
      label: 'Orders Revenue',
      color: warningColor,
      valueFormatter
    },
    {
      id: 'RevenueSecondary',
      data: [20, 110, 65, 86, 80, 0, 55],
      stack: 'revenue',
      label: 'Orders Revenue',
      color: warningLightColor,
      valueFormatter
    },
    {
      id: 'CostMain',
      data: [120, 45, 78, 150, 168, 145, 99],
      stack: 'cost',
      label: 'Delivery Costs',
      color: primaryColor,
      valueFormatter
    },
    {
      id: 'CostSecondary',
      data: [80, 155, 122, 50, 32, 55, 101],
      stack: 'cost',
      label: 'Delivery Costs',
      color: primaryLightColor,
      valueFormatter
    }
  ];

  const legendSeries = [...initialSeries.slice(0, 1), ...initialSeries.slice(2, 3)];

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2.5, pb: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography fontSize={14} color="text.secondary" gutterBottom>
              Net Earnings
            </Typography>
            <Typography variant="h4">1,560</Typography>
          </Box>

          <Stack direction="row" gap={3}>
            {legendSeries.map((series) => (
              <Stack
                key={series.label}
                direction="row"
                alignItems="center"
                gap={1}
                onClick={() => toggleSeriesVisibility(series.label)}
                onMouseEnter={() => handleHighlight(series.id)}
                onMouseLeave={() => handleHighlight(null)}
                sx={{
                  cursor: 'pointer',
                  opacity: seriesVisibility[series.label] ? 1 : 0.45,
                  transition: 'opacity 0.2s ease-in-out'
                }}
              >
                <Box sx={{ height: 10, width: 10, borderRadius: '50%', backgroundColor: series.color }} />
                <Typography variant="body2">{series.label}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <BarChart
          hideLegend
          height={380}
          grid={{ horizontal: true }}
          xAxis={[
            {
              data: labels,
              tickSize: 7,
              disableLine: true,
              categoryGapRatio: downSM ? 0.5 : 0.7,
              barGapRatio: downSM ? 0.4 : 0.7
            }
          ]}
          yAxis={[{ disableLine: true, tickSize: 7, tickMaxStep: 50 }]}
          series={initialSeries
            .map((s) => ({
              ...s,
              type: 'bar',
              color: withAlpha(s.color, 0.85),
              visible: seriesVisibility[s.label]
            }))
            .filter((s) => s.visible)}
          highlightedItem={highlightedItem}
          slotProps={{ bar: { rx: 4, ry: 4 }, tooltip: { trigger: 'item' } }}
          axisHighlight={{ x: 'none' }}
          margin={{ top: 30, left: -5, bottom: 25, right: 10 }}
          sx={{
            '& .MuiBarElement-root:hover': { opacity: 0.6 },
            '& .MuiChartsGrid-line': {
              strokeDasharray: '4 4',
              stroke: theme.vars.palette.divider
            },
            '& .MuiChartsAxis-root.MuiChartsAxis-directionX .MuiChartsAxis-tick': {
              stroke: 'transparent'
            },
            '& .MuiChartsAxis-root.MuiChartsAxis-directionY .MuiChartsAxis-tick': {
              stroke: 'transparent'
            }
          }}
        />
      </Box>
    </MainCard>
  );
}
