// styles

// components / pages / images

// tools
import { Card, CardContent, Stack, Typography, Box } from '@mui/material';

const ModuleResourceCard = ({ moduleCode, moduleMC, moduleName, moduleFaculty, moduleDept, selectedModuleResources }) => {
    return (
        <Card elevation={0} sx={{ marginBottom: "10px", padding: "30px", width: "42vw", bgcolor: "light_blue.light", borderRadius: "15px" }}>
            <CardContent>
                <Stack gap="32px">
                    <Stack gap="8px">
                        <Typography variant="h2">{moduleCode}</Typography>
                        <Typography variant="h4">{moduleName}</Typography>
                        <Typography variant="tag_thin">{moduleDept} • {moduleFaculty} • {moduleMC} MCs</Typography>
                    </Stack>
                    <Stack gap="8px">
                        <Typography variant="body_bold" color="light_blue.dark">Module Description</Typography>
                        <Typography variant="body_thin">{selectedModuleResources.moduleDescription}</Typography>
                    </Stack>
                    <Stack gap="8px">
                        <Typography variant="body_bold" color="light_blue.dark">Module Website</Typography>
                        <Typography variant="body_thin">{selectedModuleResources.moduleWebsite}</Typography>
                    </Stack>
                    <Stack gap="8px">
                        <Typography variant="body_bold" color="light_blue.dark">Module Books</Typography>
                        <Box display="flex" flexDirection="column">
                            <Stack direction="row" alignItems="flex-end" gap="8px">
                                <Typography variant="body_thin">Title</Typography>
                                <Typography variant="tag_thin">Edition</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap="8px">
                                <Typography variant="tag_thin">Author</Typography>
                                <Typography variant="tag_thin">•</Typography>
                                <Typography variant="tag_thin">Publisher</Typography>
                            </Stack>
                            <Typography variant="tag_thin">Link</Typography>
                        </Box>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default ModuleResourceCard