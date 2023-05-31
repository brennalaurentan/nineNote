import '../index.css';
import { Helmet } from 'react-helmet';
import Main_Navbar from '../components/Main_Navbar';
import Module_Pill from '../components/Module_Pill';
import Progress_Bar_Label from '../components/Progress_Bar_Label';
import { Stack, Typography } from '@mui/material'; 

const Graduation_Progress_Tracker = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Graduation Progress Tracker</title>
      </Helmet>
      <Main_Navbar />
      <Stack gap="32px" padding="32px"> {/* for viewing purposes - can delete afterwards */}
        <Module_Pill />
        <Typography variant="h3">Credits Selected</Typography>
        <Progress_Bar_Label type="circular" name="Common Curriculum Requirements"/>
        <Progress_Bar_Label type="circular" name="Programme Requirements"/>
        <Progress_Bar_Label type="circular" name="Unrestricted Electives Requirements"/>
        <Typography variant="h3">Graduation Status</Typography>
        <Progress_Bar_Label type="linear"/>
      </Stack>
    </>
  )
}

export default Graduation_Progress_Tracker