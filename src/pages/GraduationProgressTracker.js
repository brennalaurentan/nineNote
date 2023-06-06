import '../index.css';
import { Helmet } from 'react-helmet';
import MainNavbar from '../components/MainNavbar';
import ModulePill from '../components/ModulePill';
import ProgressBarLabel from '../components/ProgressBarLabel';
import MainButton from '../components/MainButton';
import { Stack, Typography, Box } from '@mui/material';

const GraduationProgressTracker = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Graduation Progress Tracker</title>
      </Helmet>
      <MainNavbar />
      <Stack direction="row" gap="128px" padding="56px">
        <Stack gap="32px">
          <Typography variant="h3">Credits Selected</Typography>
          <ProgressBarLabel type="circular" name="Common Curriculum Requirements" />
          <ProgressBarLabel type="circular" name="Programme Requirements" />
          <ProgressBarLabel type="circular" name="Unrestricted Electives Requirements" />
          <Typography variant="h3">Graduation Status</Typography>
          <ProgressBarLabel type="linear" />
          <Typography variant="h3">Module Exemptions</Typography>
          <Box bgcolor="light_blue.light" padding="30px" borderRadius="30px" display="flex" flexDirection="column" gap="30px">
            <Stack direction="row" display="flex" justifyContent="flex-end">
              <MainButton type="text" main_color="dark_gray.main" value="+ ADD NEW" />
            </Stack>
            <Box display="flex" flexWrap="wrap" gap="30px">
              <ModulePill />
            </Box>
          </Box>
        </Stack>
        <Stack gap="32px">
          <Stack direction="row" display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h3">Module Planner</Typography>
            <MainButton type="contained" main_color="blue.main" value="SAVE" />
          </Stack>
          <Box bgcolor="light_blue.light" padding="30px" borderRadius="30px" display="flex" flexDirection="column" gap="30px">
            <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body_bold">Y1 S1</Typography>
              <MainButton type="text" main_color="dark_gray.main" value="+ ADD NEW" />
            </Stack>
            <Box display="flex" flexWrap="wrap" gap="30px">
              <ModulePill />
              <ModulePill />
              <ModulePill />
              <ModulePill />
              <ModulePill />
              <ModulePill />
            </Box>
          </Box>
        </Stack>
      </Stack>
    </>
  )
}

export default GraduationProgressTracker