import '../index.css';
import { Helmet } from 'react-helmet';
import Main_Navbar from '../components/Main_Navbar';

const Module_Resource_Directory = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Module Resource Directory</title>
      </Helmet>
      <Main_Navbar/>
      <div>Module Resource Directory</div>
    </>
  )
}

export default Module_Resource_Directory