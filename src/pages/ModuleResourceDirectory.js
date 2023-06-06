import '../index.css';
import { Helmet } from 'react-helmet';
import MainNavbar from '../components/MainNavbar';
import ModuleListItem from '../components/ModuleListItem';
import ModuleResourceCard from '../components/ModuleResourceCard'
import { Stack, Typography } from '@mui/material';

const ModuleResourceDirectory = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Module Resource Directory</title>
      </Helmet>
      <MainNavbar />
      <Stack gap="16px" padding="56px">
        <Typography variant="h3">All Modules</Typography>
        <Stack direction="row" gap="64px">
          <ModuleListItem />
          <ModuleResourceCard />
        </Stack>
      </Stack>
    </>
  )
}

export default ModuleResourceDirectory