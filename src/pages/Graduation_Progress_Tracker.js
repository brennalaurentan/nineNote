import '../index.css';
import { Helmet } from 'react-helmet';
import Main_Navbar from '../components/Main_Navbar';
import Module_Pill from '../components/Module_Pill';
import Progress_Bar_Label from '../components/Progress_Bar_Label';
import Main_Button from '../components/Main_Button';
import { Stack, Typography, Box, Button } from '@mui/material';

const Graduation_Progress_Tracker = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Graduation Progress Tracker</title>
      </Helmet>
      <Main_Navbar />
      <Stack direction="row" gap="128px" padding="56px">
        <Stack gap="32px">
          <Typography variant="h3">Credits Selected</Typography>
          <Progress_Bar_Label type="circular" name="Common Curriculum Requirements" />
          <Progress_Bar_Label type="circular" name="Programme Requirements" />
          <Progress_Bar_Label type="circular" name="Unrestricted Electives Requirements" />
          <Typography variant="h3">Graduation Status</Typography>
          <Progress_Bar_Label type="linear" />
          <Typography variant="h3">Module Exemptions</Typography>
          <Box bgcolor="light_blue.light" padding="30px" borderRadius="30px" display="flex" flexDirection="column" gap="30px">
            <Stack direction="row" display="flex" justifyContent="flex-end">
              <Main_Button type="text" main_color="dark_gray.main" value="+ ADD NEW" />
            </Stack>
            <Box display="flex" flexWrap="wrap" gap="30px">
              <Module_Pill />
            </Box>
          </Box>
        </Stack>
        <Stack gap="32px">
          <Stack direction="row" display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h3">Module Planner</Typography>
            <Main_Button type="contained" main_color="blue.main" value="SAVE" />
          </Stack>
          <Box bgcolor="light_blue.light" padding="30px" borderRadius="30px" display="flex" flexDirection="column" gap="30px">
            <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body_bold">Y1 S1</Typography>
              <Main_Button type="text" main_color="dark_gray.main" value="+ ADD NEW" />
            </Stack>
            <Box display="flex" flexWrap="wrap" gap="30px">
              <Module_Pill />
              <Module_Pill />
              <Module_Pill />
              <Module_Pill />
              <Module_Pill />
              <Module_Pill />
            </Box>
          </Box>
        </Stack>
      </Stack>
    </>
  )
}

export default Graduation_Progress_Tracker