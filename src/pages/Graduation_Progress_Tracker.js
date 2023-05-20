import '../index.css';
import { Helmet } from 'react-helmet';
import Main_Navbar from '../components/Main_Navbar';
import Module_Pill from '../components/Module_Pill';

const Graduation_Progress_Tracker = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Graduation Progress Tracker</title>
      </Helmet>
      <Main_Navbar />
      <Module_Pill />
    </>
  )
}

export default Graduation_Progress_Tracker