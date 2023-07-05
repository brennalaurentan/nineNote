// styles

// components / pages / images

// tools
import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';

const pageModuleCount = 10;

const ModuleResourcePagination = ({ moduleData, totalModuleCount, filterModuleData, setDisplayedModules }) => {
    const [pagination, setPagination] = useState({
        from: 0,
        to: pageModuleCount
    })

    useEffect(() => {
        filterModuleData(pagination.from, pagination.to).then(response => {
            console.log("Filtered data for current page: ", response);
            setDisplayedModules(response);
        })
    }, [pagination.to, pagination.from]);

    const handlePageChange = (event, page) => {
        const from = (page - 1) * pageModuleCount;
        const to = (page - 1) * pageModuleCount + pageModuleCount;
        setPagination({ from: from, to: to })
    }

    return (
        <Pagination
            sx={{ bgcolor: "white.main", justifyContent: "center" }}
            count={Math.ceil(totalModuleCount / pageModuleCount)}
            onChange={handlePageChange}
        />
    )
}

export default ModuleResourcePagination;