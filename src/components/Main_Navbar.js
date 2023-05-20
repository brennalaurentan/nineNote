import { Link, Avatar, AppBar, Toolbar, Typography, Stack } from '@mui/material';

const Main_Navbar = () => {
  return (
      <AppBar position="sticky" sx={{bgcolor: "blue.main"}}>
        <Toolbar>
          <Typography variant="logo" color="white.main" sx={{ flexGrow: 1 }}>nineNote</Typography>
          <Stack direction="row" gap="64px" display="flex" alignItems="center">
            <Link href="/" underline="none" color="white.main">Login</Link>
            <Link href="/graduation-progress-tracker" underline="none" color="white.main">Graduation Progress Tracker</Link>
            <Link href="/module-recommender" underline="none" color="white.main">Module Recommender</Link>
            <Link href="/module-resource-directory" underline="none" color="white.main">Module Resource Directory</Link>
            <Link href="/my-profile">
              <Avatar sx={{ bgcolor: "dark_gray.main", textDecoration:"none" }}>NN</Avatar>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
  )
}

export default Main_Navbar