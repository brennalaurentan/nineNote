// styles

// components / pages / images

// tools
import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ModulePillMenu = ({ moduleID, moduleCode, yearSem, onMenuClick }) => {
    const [menu, setMenu] = useState(null);
    const open = Boolean(menu);
    const handleClick = (event) => {
        setMenu(event.currentTarget);
    };
    const handleClose = () => {
        setMenu(null);
    };
    const handleDelete = () => {
        onMenuClick(moduleID, moduleCode, yearSem);
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
                <MenuItem onClick={handleDelete} sx={{ color: "red.main" }}>Delete</MenuItem>
            </Menu>
        </>
    )
}

export default ModulePillMenu