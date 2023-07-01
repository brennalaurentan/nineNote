// styles
import '../index.css';

// components / pages / images
import MainNavbar from '../components/common/MainNavbar';
import ModuleListItem from '../components/module_resource_directory/ModuleListItem';
import ModuleResourceCard from '../components/module_resource_directory/ModuleResourceCard'
import ModuleResourceTabSection from '../components/module_resource_directory/ModuleResourceTabSection';

// tools
import { Helmet } from 'react-helmet';
import { Divider, Typography, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Drawer, Toolbar, Box } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const ModuleResourceDirectory = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Module Resource Directory</title>
      </Helmet>
      <MainNavbar />
      {/* <Stack direction="row" gap="64px">
          <ModuleListItem />
          <ModuleResourceCard />
        </Stack> */}
      <ModuleResourceTabSection />
    </>
  )
}

export default ModuleResourceDirectory