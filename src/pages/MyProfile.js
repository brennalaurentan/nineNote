import '../index.css';
import { Typography, Stack, Box, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Helmet } from 'react-helmet';
import MainNavbar from '../components/MainNavbar';
import MyProfileTabPanel from '../components/MyProfileTabPanel';
import BasicInfoForm from '../components/BasicInfoForm';
import PolytechnicRadioGroup from '../components/PolytechnicRadioGroup';
import ModuleExemptionTable from '../components/ModuleExemptionTable'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebase';
import { useState } from 'react';

const MyProfile = () => {

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
      <Stack direction="row" padding="56px">
        <MyProfileTabPanel />
        <Stack ml="512px" gap="64px">
          <Stack direction="row" gap="64px" alignItems="center">
            <Avatar sx={{ bgcolor: "blue.light", textDecoration: "none", width: 150, height: 150 }}>
              <EditIcon sx={{ color: "blue.main" }}/>
            </Avatar>
            <Box>
              <Typography variant="body_bold" color="blue.main">NAME</Typography>
              <Stack direction="row" gap="16px" alignItems="center">
                <Typography variant="h2">nineNote User</Typography>
                <EditIcon sx={{ color: "blue.main" }} />
              </Stack>
            </Box>
          </Stack>
          <BasicInfoForm />
          <PolytechnicRadioGroup />
          <ModuleExemptionTable />
        </Stack>
      </Stack>
    </>
  )
}

export default MyProfile