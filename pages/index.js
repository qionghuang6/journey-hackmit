import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import Copyright from '../src/Copyright';

export default function Index() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch('/api/user')
      const user = await res.json()
      setUser(user)
    }
    getUser()
  }, [])
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Journey
        </Typography>
        <Typography variant="h5" component="h1" gutterBottom>
          User: 
        </Typography>
        <Typography>{JSON.stringify(user)}</Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <Copyright />
      </Box>
    </Container>
  );
}
