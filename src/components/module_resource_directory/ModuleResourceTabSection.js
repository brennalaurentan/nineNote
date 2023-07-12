// styles

// components / pages / images
import ModuleListItem from './ModuleListItem';
import ModuleResourceTabContent from './ModuleResourceTabContent';
import ModuleResourcePagination from './ModuleResourcePagination';

// tools
import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, TextField } from '@mui/material';


const ModuleResourceTabSection = ({ moduleData }) => {
    // handles displayed modules in selected page according to pagination
    const [displayedModules, setDisplayedModules] = useState([]);

    // handles selected index upon clicking module list item
    const [selectedModuleCode, setSelectedModuleCode] = useState('');

    // handles filtered modules upon search input
    const [filteredModules, setFilteredModules] = useState(moduleData);
    const [filteredModulesCount, setFilteredModulesCount] = useState(filteredModules.length);

    const [page, setPage] = useState(1);

    // updates selected module code when module item is clicked
    const handleModuleChange = (event, moduleCode) => {
        console.log(moduleCode);
        setSelectedModuleCode(moduleCode);
    };

    // split data in selected page according to pagination
    async function splitModuleData(from, to) {
        return filteredModules.slice(from, to);
    }

    // set default module display
    useEffect(() => {
        const defaultModules = moduleData.slice(0, 10);
        setFilteredModules(moduleData);
        setFilteredModulesCount(moduleData.length);
        setDisplayedModules(defaultModules);
        setSelectedModuleCode('ABM5001');
    }, [moduleData])


    // updates module data upon search input
    const handleSearchFilter = (event) => {
        console.log(event.target.value);
        const searchWord = event.target.value;
        const filterBySearch = moduleData.filter((module) => {
            return module.moduleCode.toLowerCase().includes(searchWord);
        })
        const defaultModules = filterBySearch.slice(0, 10);
        const defaultModuleCode = defaultModules[0].moduleCode;
        setFilteredModules(filterBySearch);
        setFilteredModulesCount(filterBySearch.length);
        setDisplayedModules(defaultModules);
        setSelectedModuleCode(defaultModuleCode);
        setPage(1);
    }

    return (
        <Box
            sx={{ display: 'flex', justifyContent: "space-between", height: 400, padding: "56px" }}
        >
            <Stack gap="16px">
                <Typography variant="h3">All Modules</Typography>
                <TextField
                    id="filled-search"
                    label="Module Code"
                    type="search"
                    onChange={handleSearchFilter}
                />
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
                    page={page}
                    setPage={setPage}
                    moduleData={filteredModules}
                    totalModuleCount={filteredModulesCount}
                    splitModuleData={splitModuleData}
                    setDisplayedModules={setDisplayedModules}
                    setSelectedModuleCode={setSelectedModuleCode}
                />
            </Stack>
            <ModuleResourceTabContent selectedModuleCode={selectedModuleCode} moduleData={moduleData} />
        </Box>
    );
}

export default ModuleResourceTabSection;