import '../index.css';
import '../styles/App.css';
import Main_Navbar from '../components/Main_Navbar';
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Graduation_Progress_Tracker from './Graduation_Progress_Tracker';
import Module_Recommender from './Module_Recommender'
import Module_Resource_Directory from './Module_Resource_Directory'

function App() {
// const ref = firebase.firestore().collection("users");

  return (
    <>  
      <Main_Navbar/>
      <div className='container'>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/graduation-progress-tracker" element={<Graduation_Progress_Tracker/>} />
          <Route path="/module-recommender" element={<Module_Recommender/>} />
          <Route path="/module-resource-directory" element={<Module_Resource_Directory/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
