import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Button, Box, Typography, useMediaQuery} from '@mui/material'
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import Adventure from '../src/adventure/Adventure';
import getApiUrl from '../src/getApiUrl';
import { Login } from '@mui/icons-material';
import {LoginForm} from '../src/login';

export default function Index() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('feed')

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

  return (<>
      {matches && <Box sx={{padding: 2, paddingTop: '3rem', position: 'fixed', left: 0, width: '200px', height: '100vh', backgroundColor: '#f3f3f3'}}>
        <Typography variant="h3"><b>JRNY.io</b></Typography>
        <Button sx={{width: '100%'}} onClick={() => setView('feed')}>Feed</Button>
        <Button sx={{width: '100%'}} onClick={() => setView('bingchilling')}>Ice Cream</Button>
        <Button sx={{width: '100%'}} onClick={() => setView('bas')}>???</Button>
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
        </div>
      ) : view == 'bas' ?
       (<Container maxWidth="md"><iframe style={{width: '100%', height: '100vh'}} src='https://bastian.vercel.app/'></iframe></Container>) :
      (
        <Container maxWidth="md">
            {[0,0,0,0,0,0].map(() => <Typography variant="h1" component="h1" gutterBottom>冰淇淋🍦bingchilling</Typography>)}
        </Container>
      )}
    </>
  )
}
