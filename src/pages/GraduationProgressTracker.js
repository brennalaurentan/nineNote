// styles
import '../index.css';

// components / pages / images
import MainNavbar from '../components/common/MainNavbar';
import CreditsSelected from '../components/graduation_progress_tracker/CreditsSelected';
import GraduationStatus from '../components/graduation_progress_tracker/GraduationStatus';
import ModuleExemptions from '../components/graduation_progress_tracker/ModuleExemptions';
import ModulePlanner from '../components/graduation_progress_tracker/ModulePlanner';

// tools
import { Helmet } from 'react-helmet';
import { Stack } from '@mui/material';

const GraduationProgressTracker = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Graduation Progress Tracker</title>
      </Helmet>
      <MainNavbar />
      <Stack direction="row" gap="64px" padding="56px">
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