import '../index.css';
import { Helmet } from 'react-helmet';
import Main_Navbar from '../components/Main_Navbar';
import Sem_Indication from '../components/Sem_Indication'
import { Stack } from '@mui/material';

const Module_Resource_Directory = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Module Resource Directory</title>
      </Helmet>
      <Main_Navbar />
      <Stack gap="32px" padding="32px"> {/* for viewing purposes - can delete afterwards */}
        <Sem_Indication sem1={true} sem2={false} st1={false} st2={false}/>
      </Stack>
    </>
  )
}

export default Module_Resource_Directory