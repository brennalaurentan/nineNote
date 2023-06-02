import '../index.css';
import { Typography, Stack, Box, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Helmet } from 'react-helmet';
import Main_Navbar from '../components/Main_Navbar';
import My_Profile_Tab_Panel from '../components/My_Profile_Tab_Panel';
import Basic_Info_Form from '../components/Basic_Info_Form';
import Polytechnic_Radio_Group from '../components/Polytechnic_Radio_Group';
import Module_Exemption_Table from '../components/Module_Exemption_Table'
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
      <Stack direction="row" padding="56px">
        <My_Profile_Tab_Panel />
        <Stack ml="512px" gap="64px">
          <Stack direction="row" gap="64px" alignItems="center">
            <Avatar sx={{ bgcolor: "blue.light", textDecoration: "none", width: 150, height: 150 }}>
              <EditIcon />
            </Avatar>
            <Box>
              <Typography variant="body_bold" color="blue.main">NAME</Typography>
              <Stack direction="row" gap="16px" alignItems="center">
                <Typography variant="h2">nineNote User</Typography>
                <EditIcon sx={{ color: "blue.main" }} />
              </Stack>
            </Box>
          </Stack>
          <Basic_Info_Form />
          <Polytechnic_Radio_Group />
          <Module_Exemption_Table />
        </Stack>
      </Stack>
    </>
  )
}

export default My_Profile