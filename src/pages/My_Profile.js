import '../index.css';
import { Helmet } from 'react-helmet';
import Main_Navbar from '../components/Main_Navbar';

const My_Profile = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | My Profile</title>
      </Helmet>
      <Main_Navbar />
      <div>My Profile</div>
    </>
  )
}

export default My_Profile