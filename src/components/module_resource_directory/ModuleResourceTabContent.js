// styles

// components / pages / images
import ModuleResourceCard from './ModuleResourceCard'

// tools
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Stack, Avatar } from '@mui/material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 5 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const ModuleResourceTabContent = ({ value }) => {
    return (
        <>
            {/* Tab 1 */}
            <TabPanel value={value} index={0}>
                <Stack gap="64px">
                    <Typography>tab 1</Typography>
                    <ModuleResourceCard />
                </Stack>
            </TabPanel>

            {/* Tab 2 */}
            <TabPanel value={value} index={1}>
                <Stack gap="64px">
                    <Typography>tab 2</Typography>
                    <ModuleResourceCard />
                </Stack>
            </TabPanel>
        </>
    )
}

export default ModuleResourceTabContent