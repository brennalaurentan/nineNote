// styles
import '../index.css';
import '../styles/App.css';

// components / pages / images
import CustomisedTheme from '../components/others/CustomisedTheme'
import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import GraduationProgressTracker from './GraduationProgressTracker';
import ModuleRecommender from './ModuleRecommender';
import ModuleResourceDirectory from './ModuleResourceDirectory';
import MyProfile from './MyProfile';

// tools
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

function App() {
  // const ref = firebase.firestore().collection("users");

  return (
    <>
      <ThemeProvider theme={CustomisedTheme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/graduation-progress-tracker" element={<GraduationProgressTracker />} />
          <Route path="/module-recommender" element={<ModuleRecommender />} />
          <Route path="/module-resource-directory" element={<ModuleResourceDirectory />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
