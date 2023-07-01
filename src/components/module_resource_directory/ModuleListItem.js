// styles

// components / pages / images
import SemIndication from './SemIndication';

// tools
import { Typography, Stack, ListItemButton, ListItemIcon, ListItemText, Box, Tab } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const ModuleListItem = ({ index, value, onSelect }) => {

    // const handleListItemClick = (event, index) => {
    //     handleChange(event, index);
    // };

    return (
        <Box width="42vw">
            <ListItemButton
                selected={value === index}
                onClick={(event) => onSelect(event, index)}
            >
                <ListItemIcon>
                    <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <>
                            <Stack direction="row" display="flex" alignItems="center" justifyContent="space-between">
                                <Stack direction="row" gap="16px">
                                    <Typography variant="body_bold">Module Code</Typography>
                                    <Typography variant="tag_bold" color="orange.main">X MCs</Typography>
                                </Stack>
                                <SemIndication sem1={true} sem2={true} st1={false} st2={false} />
                            </Stack>
                        </>
                    }
                    secondary={
                        <>
                            <Typography variant="tag_thin" color="black.main">Module Name</Typography>
                        </>
                    }
                />
            </ListItemButton>
        </Box>
    )
}

export default ModuleListItem