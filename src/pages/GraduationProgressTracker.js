import '../index.css';
import { Helmet } from 'react-helmet';
import MainNavbar from '../components/MainNavbar';
import ModulePill from '../components/ModulePill';
import ProgressBarLabel from '../components/ProgressBarLabel';
import { Stack, Typography } from '@mui/material'; 

const GraduationProgressTracker = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Graduation Progress Tracker</title>
      </Helmet>
      <MainNavbar />
      <Stack gap="32px" padding="32px"> {/* for viewing purposes - can delete afterwards */}
        <ModulePill />
        <Typography variant="h3">Credits Selected</Typography>
        <ProgressBarLabel type="circular" name="Common Curriculum Requirements"/>
        <ProgressBarLabel type="circular" name="Programme Requirements"/>
        <ProgressBarLabel type="circular" name="Unrestricted Electives Requirements"/>
        <Typography variant="h3">Graduation Status</Typography>
        <ProgressBarLabel type="linear"/>
      </Stack>
    </>
  )
}

export default GraduationProgressTracker