// styles
import '../index.css';

// components / pages / images
import MainNavbar from '../components/common/MainNavbar';
import ModuleListItem from '../components/module_resource_directory/ModuleListItem';
import ModuleResourceCard from '../components/module_resource_directory/ModuleResourceCard'

// tools
import { Helmet } from 'react-helmet';
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