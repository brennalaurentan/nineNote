import '../index.css';
import { Helmet } from 'react-helmet';
import MainNavbar from '../components/MainNavbar';
import CreditsSelected from '../components/CreditsSelected';
import GraduationStatus from '../components/GraduationStatus';
import ModuleExemptions from '../components/ModuleExemptions';
import ModulePlanner from '../components/ModulePlanner';
import { Stack } from '@mui/material';

const GraduationProgressTracker = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Graduation Progress Tracker</title>
      </Helmet>
      <MainNavbar />
      <Stack direction="row" gap="128px" padding="56px">
        <Stack gap="56px">
          <CreditsSelected />
          <GraduationStatus />
          <ModuleExemptions />
        </Stack>
        <ModulePlanner />
      </Stack>
    </>
  )
}

export default GraduationProgressTracker