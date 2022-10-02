import { useState } from 'react';
import { Box, Typography } from '@mui/material';


export default function Experience({width = '100%', style}) {
  return (
    <Box sx={{ borderRadius: '16px', overflow: 'hidden', ...style}}>
      <img src='/experience.jpeg' style={{height: 'same-as-width', width, objectFit: 'cover'}}/>
    </Box>
  );
}
