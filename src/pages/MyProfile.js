// styles
import '../index.css';

// components / pages / images
import MainNavbar from '../components/common/MainNavbar';
import MyProfileTabSection from '../components/my_profile/MyProfileTabSection';

// tools
import { Helmet } from 'react-helmet';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/others/firebase';
import { useState } from 'react';

const MyProfile = ({ setOpenDeleteAccountSnackBar }) => {

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
      <MainNavbar />
      <MyProfileTabSection setOpenDeleteAccountSnackBar={setOpenDeleteAccountSnackBar}/>
    </>
  )
}

export default MyProfile