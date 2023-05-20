import '../index.css';
import { Helmet } from 'react-helmet';
import Main_Navbar from '../components/Main_Navbar';

const Graduation_Progress_Tracker = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Graduation Progress Tracker</title>
      </Helmet>
      <Main_Navbar/>
      <div>Graduation Progress Tracker</div>
    </>
  )
}

export default Graduation_Progress_Tracker