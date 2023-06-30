// styles

// components / pages / images

// tools
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { Menu, MenuItem, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const RecommendedModulePillMenu = ({ moduleCode, moduleName, moduleMC, yearSem, onMenuClick }) => {
    const [menu, setMenu] = useState(null);
    const open = Boolean(menu);

    const handleClick = (event) => {
        setMenu(event.currentTarget);
    };
    
    const handleClose = () => {
        setMenu(null);
    };
    
    const handleAdd = () => {
        onMenuClick(moduleCode, moduleName, moduleMC, yearSem);
        setMenu(null);
    };

    return (
        <>
            <IconButton aria-label="delete" size="small" onClick={handleClick}>
                <KeyboardArrowDownIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={menu}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleAdd}>Add to Module Planner</MenuItem>
            </Menu>
        </>
    )
}

export default RecommendedModulePillMenu