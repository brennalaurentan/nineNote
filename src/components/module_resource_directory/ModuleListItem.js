// styles

// components / pages / images
import SemIndication from './SemIndication';

// tools
import { Typography, Stack, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useEffect, useState } from 'react';

const ModuleListItem = ({ index, selectedModuleCode, onSelect, moduleCode, moduleMC, moduleName, moduleSem }) => {
    // handles semester indication based on nusmods api semester data
    const [semesterArray, setSemesterArray] = useState([]);

    // updates semester array to be displayed on user interface
    useEffect(() => {
        const currentSemesterArray = [false, false, false, false];

        moduleSem.map((sem, index) =>
            sem.semester === 1
                ? currentSemesterArray[0] = true
                : sem.semester === 2
                    ? currentSemesterArray[1] = true
                    : sem.semester === 3
                        ? currentSemesterArray[2] = true
                        : currentSemesterArray[3] = true
        )
        setSemesterArray(currentSemesterArray);
    }, [moduleSem])

    return (
        <Box width="42vw">
            <ListItemButton
                selected={selectedModuleCode === moduleCode}
                onClick={(event) => onSelect(event, moduleCode)}
                sx={{
                    "&.Mui-selected": {
                        backgroundColor: "light_blue.light"
                    },
                    ":hover": {
                        backgroundColor: "light_gray"
                    }
                }}
            >
                <ListItemIcon>
                    <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <>
                            <Stack direction="row" display="flex" alignItems="center" justifyContent="space-between">
                                <Stack direction="row" gap="16px">
                                    <Typography variant="body_bold">{moduleCode}</Typography>
                                    <Typography variant="tag_bold" color="orange.main">{moduleMC} MCs</Typography>
                                </Stack>
                                <SemIndication sem1={semesterArray[0]} sem2={semesterArray[1]} st1={semesterArray[2]} st2={semesterArray[3]} />
                            </Stack>
                        </>
                    }
                    secondary={
                        <>
                            <Typography variant="tag_thin" color="black.main">{moduleName}</Typography>
                        </>
                    }
                />
            </ListItemButton>
        </Box>
    )
}

export default ModuleListItem