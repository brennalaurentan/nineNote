// styles

// components / pages / images
import MyProfileTabContent from './MyProfileTabContent';

// tools
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Typography, Stack } from '@mui/material';

const CustomisedTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#ffffff',
  },
});

const CustomisedTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  color: theme.palette.black.main,
  fontFamily: theme.typography.body_thin.fontFamily,
  fontSize: theme.typography.body_thin.fontSize,
  fontWeight: theme.typography.body_thin.fontWeight,
  '&:hover': {
    bgcolor: "#F5F5F5",
  },
  '&.Mui-selected': {
    color: theme.palette.blue.main,
    backgroundColor: theme.palette.blue.light,
    fontWeight: theme.typography.body_bold.fontWeight,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const MyProfileTabSection = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', height: 400, padding: "56px" }}
      >
        <Stack gap="16px">
          <Typography variant="h3">My Profile</Typography>
          <CustomisedTabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
          >
            <CustomisedTab label="Basic Information" {...a11yProps(0)} />
            <CustomisedTab label="Module Exemptions" {...a11yProps(1)} />
          </CustomisedTabs>
        </Stack>
        <MyProfileTabContent value={value} />
      </Box>
    </>
  );
}

export default MyProfileTabSection;