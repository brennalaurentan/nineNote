// styles

// components / pages / images

// tools
import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';

const pageModuleCount = 10;

const ModuleResourcePagination = ({ page, setPage, moduleData, totalModuleCount, splitModuleData, setDisplayedModules,setSelectedModuleCode }) => {
    // handles index of modules in entire module data
    const [pagination, setPagination] = useState({
        from: 0,
        to: pageModuleCount
    })

    // executes module filtering and updates displayed modules
    useEffect(() => {
        splitModuleData(pagination.from, pagination.to).then(response => {
            console.log("Filtered data for current page: ", response);
            setDisplayedModules(response);
        })
    }, [pagination.from, pagination.to]);

    // updates pagination from and to index and updates selected module code
    const handlePageChange = (event, page) => {
        const from = (page - 1) * pageModuleCount;
        const to = (page - 1) * pageModuleCount + pageModuleCount;
        setPagination({ from: from, to: to })
        setPage(page);
        console.log("First module code displayed: ", moduleData[from].moduleCode);
        setSelectedModuleCode(moduleData[from].moduleCode);
    }

    return (
        <Pagination
            sx={{ bgcolor: "white.main", justifyContent: "center" }}
            count={Math.ceil(totalModuleCount / pageModuleCount)}
            page={page}
            onChange={handlePageChange}
        />
    )
}

export default ModuleResourcePagination;