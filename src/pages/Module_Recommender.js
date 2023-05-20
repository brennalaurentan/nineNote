import '../index.css';
import { Helmet } from 'react-helmet';
import Main_Navbar from '../components/Main_Navbar';

const Module_Recommender = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Module Recommender</title>
      </Helmet>
      <Main_Navbar />
      <div>Module Recommender</div>
    </>
  )
}

export default Module_Recommender