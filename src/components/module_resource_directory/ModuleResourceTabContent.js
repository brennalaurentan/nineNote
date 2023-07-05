// styles

// components / pages / images
import ModuleResourceCard from './ModuleResourceCard'

// tools
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Stack } from '@mui/material';

function TabPanel(props) {
    const { children, selectedModuleCode, moduleCode, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={selectedModuleCode !== moduleCode}
            id={`vertical-tabpanel-${moduleCode}`}
            aria-labelledby={`vertical-tab-${moduleCode}`}
            {...other}
        >
            {selectedModuleCode === moduleCode && (
                <Box sx={{ p: 5 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    moduleCode: PropTypes.string.isRequired,
    selectedModuleCode: PropTypes.string.isRequired,
};

const ModuleResourceTabContent = ({ selectedModuleCode, moduleData }) => {
    return (
        <>
            {moduleData.map((module, index) => (
                <TabPanel key={index} selectedModuleCode={selectedModuleCode} moduleCode={module.moduleCode}>
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
        </>
    )
}

export default ModuleResourceTabContent