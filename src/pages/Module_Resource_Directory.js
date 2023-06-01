import '../index.css';
import { Helmet } from 'react-helmet';
import Main_Navbar from '../components/Main_Navbar';
import Module_List_Item from '../components/Module_List_Item';
import Module_Resource_Card from '../components/Module_Resource_Card'
import { Stack, Typography } from '@mui/material';

const Module_Resource_Directory = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Module Resource Directory</title>
      </Helmet>
      <Main_Navbar />
      <Stack gap="16px" padding="56px">
        <Typography variant="h3">All Modules</Typography>
        <Stack direction="row" gap="64px">
          <Module_List_Item />
          <Module_Resource_Card />
        </Stack>
      </Stack>
    </>
  )
}

export default Module_Resource_Directory