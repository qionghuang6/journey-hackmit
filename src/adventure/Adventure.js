import { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField} from '@mui/material';
import Experience from './Experience';
import Journey from './Journey'
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const ExperienceJourneyGroup = ({eStyle, jStyle}) => {
  const x = ['experience.jpeg', 'journey.jpeg', '0.png', '1.png', '2.png', '3.png']
  const a = x[Math.floor(Math.random() * x.length)];
  const b = x[Math.floor(Math.random() * x.length)];
  return (
    <Box sx={{position: 'relative', width: '100%', height: 200}}>
      <img src={a} style={{cursor: 'pointer', position: 'absolute', zIndex: '1', objectFit: 'contain', top: '0%', width: '70%', height: 'same-as-width', borderRadius: '16px', ...eStyle,}}/>
      <img src={b} style={{cursor: 'pointer', position: 'absolute', objectFit: 'contain', margin: 'auto', top: '25%', left: '60%', width: '60%', height: 'same-as-width', borderRadius: '16px', ...jStyle}}/>
    </Box>
  )
}

export default function Adventure({a}) {
  const profileImgUrl = '/phil.jpeg'
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiked(!liked)
    }, 4000)
    return () => clearInterval(interval)
  }, [liked])

  const name = 'washington d.C!'
  const timestamp = a ? new Date('2021-09-01T04:23:00') : new Date('2022-05-02T03:32:00')
  const likeCount = a ? 6293 : 121
  const caption = a ? `this place was lowkey kinda mid. i used my boosted board to get here and i just got soup.` : 'nice!'
  const stars = a ? 3 : 5

  const handleLikeClick = () => {
    setLiked(!liked)
  }

  const handleOpenProfile = () => {
    //TODO
  }

  let starIcons = []
  for (let i = 0; i < 5; i++) {
    if (i < stars) {
      starIcons.push(<StarIcon sx={{color: 'gold', width: '40px', height: '35px'}}/>)
    } else {
      starIcons.push(<StarOutlineIcon sx={{color: 'black', width: '40px', height: '35px'}}/>)
    }
  }

  return (
    <Box sx={{ background: '#f5f5f5', maxWidth: 'sm', marginY: '16px', border: 2, borderColor: 'black', borderRadius: '16px', overflow: 'hidden' }}>
      <Box paddingX={2} paddingY={1}>
        <Grid container
          justifyContent="space-between"
          alignItems="center">
          <Grid item>
            <Box>
              <Grid container spacing={1}>
                <Grid item>
                  <img
                    onClick={handleOpenProfile}
                    src={profileImgUrl}
                    style={{ borderRadius: '50%', width: '56px', height: '56px', objectFit: 'cover', cursor: 'pointer'}}>  
                  </img>
                </Grid>
                <Grid item>
                 <Typography variant="h5" color="text.secondary" align="center">
                    {name}
                  </Typography>
                  <Typography variant="body" color="text.secondary" align="center">
                    {timestamp.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <Box onClick={handleLikeClick}
              padding={1}
              sx={{ border: liked ? '2px solid #FF6161' : '2px solid gray', alignItems: 'center', margin: 'auto', backgroundColor: 'lightgray', borderRadius: '24px', height: '48px', cursor: 'pointer'}}>
              <Grid container spacing={1}>
                <Grid item>
                <FavoriteIcon sx={{ color: liked ? '#FF6161' : '#BEA0A0'}}/>
                </Grid>
                <Grid item>
                <Typography>{`${liked ? likeCount + 1 : likeCount }`}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box margin={1} padding={1}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <ExperienceJourneyGroup />
          </Grid>
          <Grid item xs={6}>
            <ExperienceJourneyGroup />
          </Grid>
          <Grid item xs={6}>
            <ExperienceJourneyGroup eStyle={{top: '25%'}} jStyle={{top: '40%'}}/>
          </Grid>
          <Grid item xs={6}>
            <Experience style={{zIndex: '2'}}/>
          </Grid>
        </Grid>
      </Box>
      <Box marginX={4} marginTop={-1} marginBottom={1}>
        <Typography align="center">{caption}</Typography>
        <Typography align="center">{starIcons}</Typography>
      </Box>
      <TextField id="outlined-basic" label="Comment" variant="outlined" sx={{width: '100%', padding: 1}}/>
    </Box>
  );
}
