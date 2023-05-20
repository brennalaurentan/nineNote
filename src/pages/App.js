import '../index.css';
import '../styles/App.css';
import Customised_Theme from '../components/Customised_Theme'
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import Login from './Login';
import Signup from './Signup';
import Graduation_Progress_Tracker from './Graduation_Progress_Tracker';
import Module_Recommender from './Module_Recommender';
import Module_Resource_Directory from './Module_Resource_Directory';
import My_Profile from './My_Profile';

function App() {
  // const ref = firebase.firestore().collection("users");

  return (
    <>
      <ThemeProvider theme={Customised_Theme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/graduation-progress-tracker" element={<Graduation_Progress_Tracker />} />
          <Route path="/module-recommender" element={<Module_Recommender />} />
          <Route path="/module-resource-directory" element={<Module_Resource_Directory />} />
          <Route path="/my-profile" element={<My_Profile />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
