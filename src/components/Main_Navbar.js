import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';

const Main_Navbar = () => {
  return (
    <nav className="nav">
        <div href="/" className="ninenote-logo">nineNote</div>  
        <div className="nav_menu">
          <Link href="/login">Login</Link>
          <Link href="/graduation-progress-tracker">Graduation Progress Tracker</Link>
          <Link href="/module-recommender">Module Recommender</Link>
          <Link href="/module-resource-directory">Module Resource Directory</Link>
        </div>
        <div>
          <Avatar sx={{ bgcolor: blue[500] }}>NN</Avatar>
        </div>
    </nav>
  )
}

export default Main_Navbar