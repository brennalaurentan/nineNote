// styles
import '../index.css';
import '../styles/App.css';

// components / pages / images
import CustomisedTheme from '../components/others/CustomisedTheme'
import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import ResetLinkSent from './ResetLinkSent';
import GraduationProgressTracker from './GraduationProgressTracker';
import ModuleRecommender from './ModuleRecommender';
import ModuleResourceDirectory from './ModuleResourceDirectory';
import MyProfile from './MyProfile';

// tools
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

function App() {
  // const ref = firebase.firestore().collection("users");
  const [openLoginSuccessSnackBar, setOpenLoginSuccessSnackBar] = useState(false);
  const [openSignupSuccessSnackBar, setOpenSignupSuccessSnackBar] = useState(false);
  const [openDeleteAccountSnackBar, setOpenDeleteAccountSnackBar] = useState(false);

  return (
    <>
      <ThemeProvider theme={CustomisedTheme}>
        <Routes>
          <Route
            path="/"
            element={<Login
              setOpenLoginSuccessSnackBar={setOpenLoginSuccessSnackBar}
              openDeleteAccountSnackBar={openDeleteAccountSnackBar}
              setOpenDeleteAccountSnackBar={setOpenDeleteAccountSnackBar}
            />}
          />
          <Route path="/signup" element={<Signup
            setOpenSignupSuccessSnackBar={setOpenSignupSuccessSnackBar} />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-link-sent" element={<ResetLinkSent />} />
          <Route
            path="/graduation-progress-tracker"
            element={<GraduationProgressTracker
              openLoginSuccessSnackBar={openLoginSuccessSnackBar}
              setOpenLoginSuccessSnackBar={setOpenLoginSuccessSnackBar}
              openSignupSuccessSnackBar={openSignupSuccessSnackBar}
              setOpenSignupSuccessSnackBar={setOpenSignupSuccessSnackBar}
            />}
          />
          <Route path="/module-recommender" element={<ModuleRecommender />} />
          <Route path="/module-resource-directory" element={<ModuleResourceDirectory />} />
          <Route
            path="/my-profile"
            element={<MyProfile
              setOpenDeleteAccountSnackBar={setOpenDeleteAccountSnackBar} />}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
