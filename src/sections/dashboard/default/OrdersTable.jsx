import PropTypes from 'prop-types';

// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';

// project imports
import Dot from 'components/@extended/Dot';

// ==============================|| FOOD DELIVERY DATA ||============================== //

function createData(orderId, item, quantity, status, amount) {
  return { orderId, item, quantity, status, amount };
}

const rows = [
  createData('#TE-10234', 'Cheese Burger', 2, 1, 14.99),
  createData('#TE-10235', 'Pepperoni Pizza', 1, 2, 18.5),
  createData('#TE-10236', 'Chicken Biryani', 3, 0, 22.75),
  createData('#TE-10237', 'Veggie Wrap', 2, 1, 11.2),
  createData('#TE-10238', 'Fried Chicken Bucket', 1, 3, 25.0),
  createData('#TE-10239', 'Pasta Alfredo', 2, 1, 19.4),
  createData('#TE-10240', 'Chocolate Milkshake', 4, 2, 16.0)
];

// ==============================|| SORT HELPERS ||============================== //

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

// ==============================|| TABLE HEADERS ||============================== //

const headCells = [
  { id: 'orderId', align: 'left', label: 'Order ID' },
  { id: 'item', align: 'left', label: 'Food Item' },
  { id: 'quantity', align: 'right', label: 'Qty' },
  { id: 'status', align: 'left', label: 'Order Status' },
  { id: 'amount', align: 'right', label: 'Total Amount' }
];

// ==============================|| TABLE HEAD ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((cell) => (
          <TableCell key={cell.id} align={cell.align}>
            {cell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER STATUS ||============================== //

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'info';
      title = 'Preparing';
      break;
    case 2:
      color = 'success';
      title = 'Delivered';
      break;
    case 3:
      color = 'error';
      title = 'Cancelled';
      break;
    default:
      color = 'primary';
      title = 'Unknown';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography variant="body2">{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDERS TABLE ||============================== //

export default function OrdersTable() {
  const order = 'asc';
  const orderBy = 'orderId';

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table>
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => (
              <TableRow hover key={row.orderId}>
                <TableCell>
                  <Link color="secondary" underline="hover">
                    {row.orderId}
                  </Link>
                </TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell>
                  <OrderStatus status={row.status} />
                </TableCell>
                <TableCell align="right">
                  <NumericFormat
                    value={row.amount}
                    displayType="text"
                    thousandSeparator
                    prefix="RS"
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.any,
  orderBy: PropTypes.string
};

OrderStatus.propTypes = {
  status: PropTypes.number
};
