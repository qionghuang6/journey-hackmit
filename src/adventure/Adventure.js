import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Experience from './Experience';
import Journey from './Journey'

export default function Adventure() {
  return (
    <Box sx={{marginY: '16px', border: 2, borderColor: 'black', borderRadius: '16px', overflow: 'hidden'}}>
        <Typography variant="h3" color="text.secondary" align="center">
            Adventure Name Here
        </Typography>
        <Experience />
        <Journey />
        <Experience />
    </Box>
  );
}
