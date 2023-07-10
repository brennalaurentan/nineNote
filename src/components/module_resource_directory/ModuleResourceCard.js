// styles

// components / pages / images

// tools
import { Card, CardContent, Stack, Typography } from '@mui/material';

const ModuleResourceCard = ({ moduleCode, moduleMC, moduleName, moduleFaculty, moduleDept }) => {
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
                        <Typography variant="body_bold" color="light_blue.dark">Textbook & Notes</Typography>
                        <Typography variant="body_thin">No Resources Available</Typography>
                    </Stack>
                    <Stack gap="8px">
                        <Typography variant="body_bold" color="light_blue.dark">Software Installation</Typography>
                        <Typography variant="body_thin">No Instructions Available</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default ModuleResourceCard