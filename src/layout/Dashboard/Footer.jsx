// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{
        gap: 1.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        p: '24px 16px 0px',
        mt: 'auto'
      }}
    >
      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} <strong>TurboEats</strong>. All rights reserved.
      </Typography>

      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
        <Link href="/about" variant="caption" color="text.primary" underline="hover">
          About
        </Link>
        <Link href="/privacy" variant="caption" color="text.primary" underline="hover">
          Privacy Policy
        </Link>
        <Link href="/terms" variant="caption" color="text.primary" underline="hover">
          Terms & Conditions
        </Link>
      </Stack>
    </Stack>
  );
}
