// styles

// components / pages / images

// tools
import { Link, Avatar, AppBar, Toolbar, Typography, Stack } from '@mui/material';
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
  async function Logout(){
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
      <AppBar position="sticky" sx={{bgcolor: "blue.main"}}>
        <Toolbar>
          <Typography variant="logo" color="white.main" sx={{ flexGrow: 1 }}>nineNote</Typography>
          <Stack direction="row" gap="64px" display="flex" alignItems="center">
            <Typography variant="tag_thin">Welcome, {user.email}</Typography>
            <Link href="/" underline="none" color="white.main">Login</Link>
            <Link href="/graduation-progress-tracker" underline="none" color="white.main">Graduation Progress Tracker</Link>
            <Link href="/module-recommender" underline="none" color="white.main">Module Recommender</Link>
            <Link href="/module-resource-directory" underline="none" color="white.main">Module Resource Directory</Link>
            <Link href="/" underline="none" color="white.main" onClick={Logout} component="button">Logout</Link>
            <Link href="/my-profile">
              <Avatar sx={{ bgcolor: "dark_gray.main", textDecoration:"none" }}>NN</Avatar>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
  )
}

export default MainNavbar