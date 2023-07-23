// styles

// components / pages / images
import ninenote_white from '../../graphics/ninenote_white.png'
import profile_image from '../../graphics/profile_image.png';

// tools
import { Link, AppBar, Toolbar, Typography, Stack, Box } from '@mui/material';
import { auth } from '../others/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainNavbar = () => {

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const navigate = useNavigate();
  async function Logout() {
    try {
      console.log("logging out: " + user.email);
      await signOut(auth);
      navigate("/");
      console.log("logout success");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "blue.main" }}>
      <Toolbar>
        <Box flexGrow={1}>
          <img src={ninenote_white} alt="Logo" width="70px" />
        </Box>
        <Stack direction="row" gap="64px" display="flex" alignItems="center">
          <Typography variant="tag_thin">Welcome, {user.email}</Typography>
          <Link href="/graduation-progress-tracker" underline="none" color="white.main">Graduation Progress Tracker</Link>
          <Link href="/module-recommender" underline="none" color="white.main">Module Recommender</Link>
          <Link href="/module-resource-directory" underline="none" color="white.main">Module Resource Directory</Link>
          <Link href="/" underline="none" color="white.main" onClick={Logout} component="button">Logout</Link>
          <Link href="/my-profile">
            <img src={profile_image} alt="Logo" width="40px" />
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default MainNavbar