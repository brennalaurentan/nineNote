import { Link, Avatar } from '@mui/material';

const Main_Navbar = () => {
  return (
    <nav className="nav">
        <div className="ninenote-logo">nineNote</div>  
        <div className="nav_menu">
          <Link href="/">Login</Link>
          <Link href="/graduation-progress-tracker">Graduation Progress Tracker</Link>
          <Link href="/module-recommender">Module Recommender</Link>
          <Link href="/module-resource-directory">Module Resource Directory</Link>
        </div>
        <div>
          <Link href="/my-profile">
            <Avatar sx={{ bgcolor: 'blue.main', textDecoration:'none' }}>NN</Avatar>
          </Link>
        </div>
    </nav>
  )
}

export default Main_Navbar