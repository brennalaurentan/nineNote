// styles

// components / pages / images
import SemIndication from './SemIndication'

// tools
import { Typography, Stack, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const ModuleListItem = () => {
    return (
        <Box width="900px">
            <Stack gap="16px">
                <ListItemButton>
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
            </Stack>
        </Box>
    )
}

export default ModuleListItem