// styles

// components / pages / images
import ModuleListItem from './ModuleListItem';
import ModuleResourceTabContent from './ModuleResourceTabContent';
import ModuleResourcePagination from './ModuleResourcePagination';

// tools
import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';


const ModuleResourceTabSection = ({ moduleData }) => {
    // handles displayed modules in selected page according to pagination
    const [displayedModules, setDisplayedModules] = useState(moduleData.slice(0, 10));

    // handles selected index upon clicking module list item
    const [selectedModuleCode, setSelectedModuleCode] = useState(displayedModules[0]);

    // updates selected module code when module item is clicked
    const handleModuleChange = (event, moduleCode) => {
        console.log(moduleCode);
        setSelectedModuleCode(moduleCode);
    };

    // filters data in selected page according to pagination
    async function filterModuleData(from, to) {
        return moduleData.slice(from, to);
    }

    return (
        <Box
            sx={{ display: 'flex', justifyContent: "space-between", height: 400, padding: "56px" }}
        >
            <Stack gap="16px">
                <Typography variant="h3">All Modules</Typography>
                <Stack gap="0px">
                    {displayedModules.map((module, index) => (
                        <ModuleListItem
                            key={index}
                            index={index}
                            selectedModuleCode={selectedModuleCode}
                            onSelect={handleModuleChange}
                            moduleCode={module.moduleCode}
                            moduleMC={module.moduleCredit}
                            moduleName={module.title}
                            moduleSem={module.semesterData}
                        />
                    ))}
                </Stack>
                <ModuleResourcePagination
                    moduleData={moduleData}
                    totalModuleCount={moduleData.length}
                    filterModuleData={filterModuleData}
                    setDisplayedModules={setDisplayedModules}
                    setSelectedModuleCode={setSelectedModuleCode}
                />
            </Stack>
            <ModuleResourceTabContent selectedModuleCode={selectedModuleCode} moduleData={moduleData}/>
        </Box>
    );
}

export default ModuleResourceTabSection;