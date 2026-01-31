import { Box, Typography } from '@mui/material';
import logo from 'assets/images/logo.jpeg';

export default function LogoMain() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}
    >
      <img
        src={logo}
        alt="TurboEats"
        style={{
          height: 80,
          width: 'auto',
          objectFit: 'contain'
        }}
      />

      <Typography
        variant="h4"
        fontWeight={800}
        sx={{ lineHeight: 1 }}
      >
        TurboEats
      </Typography>
    </Box>
  );
}

