import { useState } from 'react';
import { Box, Typography } from '@mui/material';

export default function Journey({width = '60%', style}) {
  return (
    <Box sx={{ borderRadius: '8px', width: '100%', overflow: 'hidden', ...style}}>
      <img src='/journey.jpeg' style={{width, height: 'same-as-width', objectFit: 'cover'}}/>
    </Box>
  );
}
