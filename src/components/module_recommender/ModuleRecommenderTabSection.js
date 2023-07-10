// styles

// components / pages / images
import ModuleRecommenderTabContent from '../module_recommender/ModuleRecommenderTabContent';

// tools
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Typography, Stack } from '@mui/material';

const CustomisedTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    display: 'none',
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
  borderRadius: "10px",
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

const ModuleRecommenderTabSection = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" padding="56px">
        <Stack gap="16px" direction="row" display="flex" alignItems="center" justifyContent="space-between" marginBottom="56px">
          <Typography variant="h3">Recommended Modules</Typography>
          <CustomisedTabs
            orientation="horizontal"
            value={value}
            onChange={handleChange}
          >
            <CustomisedTab label="Year 1" {...a11yProps(0)} />
            <CustomisedTab label="Year 2" {...a11yProps(1)} />
            <CustomisedTab label="Year 3" {...a11yProps(2)} />
            <CustomisedTab label="Year 4" {...a11yProps(3)} />
          </CustomisedTabs>
        </Stack>
        <ModuleRecommenderTabContent value={value} />
      </Box>
    </>
  );
}

export default ModuleRecommenderTabSection;