import '../index.css';
import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import Main_Navbar from '../components/Main_Navbar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebase';
import { useState } from 'react';

const My_Profile = () => {

  /*
  const auth = getAuth();
  const user = auth.currentUser;
  var userEmail = "";
  if (user != null) {
    userEmail = user.email;
  }
  */

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  console.log("current user:" + user.email);

  return (
    <>
      <Helmet>
        <title>nineNote | My Profile</title>
      </Helmet>
      <Main_Navbar />
      <div>My Profile</div>
      <Typography variant="tag_thin">Current user: {user.email}</Typography>
      <Typography>Testing</Typography>
    </>
  )
}

export default My_Profile