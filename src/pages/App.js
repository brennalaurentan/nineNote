import '../index.css';
import '../styles/App.css';
import CustomisedTheme from '../components/CustomisedTheme'
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import Login from './Login';
import Signup from './Signup';
import GraduationProgressTracker from './GraduationProgressTracker';
import ModuleRecommender from './ModuleRecommender';
import ModuleResourceDirectory from './ModuleResourceDirectory';
import MyProfile from './MyProfile';

function App() {
  // const ref = firebase.firestore().collection("users");

  return (
    <>
      <ThemeProvider theme={CustomisedTheme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
