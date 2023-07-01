// styles

// components / pages / images
import ModuleListItem from './ModuleListItem';
import ModuleResourceTabContent from './ModuleResourceTabContent';

// tools
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Typography, Stack, List, ListItemButton, ListItemText, ListItemIcon, Divider } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';

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

const ModuleResourceTabSection = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleChange = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <Box
                sx={{ display: 'flex', justifyContent: "space-between", height: 400, padding: "56px" }}
            >
                <Stack gap="16px">
                    <Typography variant="h3">All Modules</Typography>
                    {/* <CustomisedTabs
                        orientation="vertical"
                        value={selectedIndex}
                        onChange={handleChange}
                    >
                        <CustomisedTab label="Basic Information" {...a11yProps(0)} />
                        <CustomisedTab label="Module Exemptions" {...a11yProps(1)} />
                    </CustomisedTabs> */}
                    <ModuleListItem index={0} value={selectedIndex} onSelect={handleChange}/>
                    <ModuleListItem index={1} value={selectedIndex} onSelect={handleChange}/>
                </Stack>
                <ModuleResourceTabContent value={selectedIndex} />
            </Box>
        </>
    );
}

export default ModuleResourceTabSection;