import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default async function Home() {
  return (
    <>
      <Box sx={{ px: 2, mb: 2 }}>
        <Box>
          <Typography variant="h1" textTransform={'capitalize'}>
            take control of your habits
          </Typography>
        </Box>
      </Box>
    </>
  );
}
