// styles

// components / pages / images
import ModuleResourceCard from './ModuleResourceCard'

// tools
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Stack } from '@mui/material';

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

const ModuleResourceTabContent = ({ value, moduleData }) => {
    return (
        <>
            {moduleData.map((module, index) => (
                <TabPanel value={value} index={index}>
                    <Stack gap="64px">
                        <ModuleResourceCard 
                            moduleCode={module.moduleCode}
                            moduleMC={module.moduleCredit}
                            moduleName={module.title}
                            moduleFaculty={module.faculty}
                            moduleDept={module.department}
                            />
                    </Stack>
                </TabPanel>
            ))}

            {/* <TabPanel value={value} index={0}>
                <Stack gap="64px">
                    <Typography>tab 1</Typography>
                    <ModuleResourceCard />
                </Stack>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Stack gap="64px">
                    <Typography>tab 2</Typography>
                    <ModuleResourceCard />
                </Stack>
            </TabPanel> */}
        </>
    )
}

export default ModuleResourceTabContent