// styles

// components / pages / images
import ModuleListItem from './ModuleListItem';
import ModuleResourceTabContent from './ModuleResourceTabContent';

// tools
import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';


const ModuleResourceTabSection = ({ moduleData }) => {
    // handles selected index upon clicking module list item
    const [selectedIndex, setSelectedIndex] = useState(0);

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
                    <Stack gap="0px">
                        {moduleData.map((module, index) => (
                            <ModuleListItem
                                key={index}
                                index={index}
                                value={selectedIndex}
                                onSelect={handleChange}
                                moduleCode={module.moduleCode}
                                moduleMC={module.moduleCredit}
                                moduleName={module.title}
                                moduleSem={module.semesterData}
                            />
                        ))}
                    </Stack>
                </Stack>
                <ModuleResourceTabContent value={selectedIndex} />
            </Box>
        </>
    );
}

export default ModuleResourceTabSection;