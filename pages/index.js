import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import Adventure from '../src/adventure/Adventure';
import getApiUrl from '../src/getApiUrl';
import MapContainer from '../components/MapContainer';

export default function Index() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(getApiUrl('/user'))
      const user = await res.json()
      setUser(user)
    }
    getUser()
  }, [])
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <MapContainer/>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          Journey
        </Typography>
        <Box sx={{ border: 2, borderColor: 'black', borderRadius: '16px', overflow: 'hidden', padding: 1, background: 'linear-gradient(270deg, rgb(180, 160, 0), rgb(220, 73, 140))'}}>
          <Typography color="white" variant="h3" component="h1" gutterBottom>
            User: 
          </Typography>
          <Typography color="white" variant="h4">{JSON.stringify(user)}</Typography>
        </Box>
        <Adventure />
        <Adventure />
        <Adventure />
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <Copyright />
      </Box>
    </Container>
  );
}
