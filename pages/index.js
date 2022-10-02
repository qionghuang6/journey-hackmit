import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Button, Box, Typography, useMediaQuery} from '@mui/material'
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import Adventure from '../src/adventure/Adventure';
import getApiUrl from '../src/getApiUrl';
import { Login } from '@mui/icons-material';
import {LoginForm} from '../src/login';

import MapContainer from "../components/MapContainer";

export default function Index() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('feed')
  const [adventures, setAdventures] = useState([])

  const [userLocation, setUserLocation] = useState({ lat: 40.79, lng: -74 });

  const matches = useMediaQuery('(min-width:900px)');

  useEffect(() => {
    const query = { user: 'test' }
    const getUser = async () => {
      const res = await fetch(
        getApiUrl(`/api/user/lookup?${new URLSearchParams(query)}`), 
        { method: 'GET' }
      )
      const user = await res.json()
      setUser(user)
    }
    void getUser()
  }, [])

  useEffect(() => {
    const getAdventures = async () => {
      const res = await fetch(
        getApiUrl(`/api/adventures/getall`), 
        { method: 'GET' }
      )
      const adventures = await res.json()
      setAdventures(adventures)
    }
    void getAdventures()
  }, [])

  useEffect(() => {
    try {
      async function getPos() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              console.log("User location found", pos);
              await setUserLocation(pos);
            },
            () => {
              console.error("Error getting user location");
              throw new Error("Error getting user location");
            }
          );
        } else {
          // Browser doesn't support Geolocation
          console.error("User didn't allow location access");
          throw new Error("User didn't allow location access");
        }
        console.log("set user location", userLocation);
      }
      getPos();
    } catch (e) {
      console.error("Error getting initial user location: ", e);
    }
  }, []);

  return (<>
      {matches && <Box sx={{zIndex: 9999999, padding: 2, paddingTop: '3rem', position: 'fixed', left: 0, width: '200px', height: '100vh', backgroundColor: '#f3f3f3'}}>
        <Typography variant="h3"><b>JRNY.io</b></Typography>
        <Button sx={{width: '100%'}} onClick={() => setView('feed')}>Feed</Button>
        <Button sx={{width: '100%'}} onClick={() => setView('map')}>Map</Button>
        <LoginForm/>
      </Box> }
      {view == 'feed' ? (
        <div style={{width: '100%', backgroundImage: 'url("/map.jpg")', marginTop: '-3rem'}}>
          <Container maxWidth="sm">
            <Box sx={{ my: 4, paddingTop: '2rem'}}>
              <Typography align="center" color="white" variant="h1" component="h1" gutterBottom>
                <b>JRNY.io</b>
              </Typography>
              <Box sx={{ border: 2, borderColor: 'black', borderRadius: '16px', overflow: 'hidden', padding: 1, background: 'linear-gradient(270deg, rgb(180, 160, 0), rgb(220, 73, 140))'}}>
                <Typography color="white" variant="h4">{user?.name}</Typography>
                <Typography color="white" variant="h5">{user?.email}</Typography>
              </Box>
              <Adventure a={false} />
              <Adventure a={true}/>
              <Adventure a={false}/>
              <Link href="/about" color="secondary">
                Go to the about page
              </Link>
              <Copyright />
            </Box>
          </Container>
        </div>
      ) : <MapContainer goToFeed={() => setView('feed')}/>}
    </>
  )
}
