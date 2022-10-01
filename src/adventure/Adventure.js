import { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Experience from './Experience';
import Journey from './Journey'
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Adventure() {
  const profileImgUrl = '/phil.jpeg'
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('hi')
      setLiked(!liked)
    }, 2000)
    return () => clearInterval(interval)
  }, [liked])

  return (
    <Box sx={{ maxWidth: 'sm', marginY: '16px', border: 2, borderColor: 'black', borderRadius: '16px', overflow: 'hidden' }}>
      <Box paddingX={2} paddingY={1}>
        <Grid container
          justifyContent="space-between"
          alignItems="center">
          <Grid item>
            <Box>
              <Grid container spacing={1}>
                <Grid item>
                  <img src={profileImgUrl} style={{ borderRadius: '50%', width: '56px', height: '56px' }}></img>
                </Grid>
                <Grid item>
                 <Typography variant="h5" color="text.secondary" align="center">
                    Adventure Name Here
                  </Typography>
                  <Typography variant="body" color="text.secondary" align="center">
                    12:30pm
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <Box padding={1} sx={{ border: liked ? '2px solid #FF6161' : '2px solid gray', alignItems: 'center', margin: 'auto', backgroundColor: 'lightgray', borderRadius: '24px', height: '48px' }}>
              <Grid container spacing={1}>
                <Grid item>
                <FavoriteIcon sx={{ color: liked ? '#FF6161' : '#BEA0A0'}}/>
                </Grid>
                <Grid item>
                <Typography>{liked ? 6294 : 6293 }</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Experience />
      <Journey />
      <Experience />
    </Box>
  );
}
