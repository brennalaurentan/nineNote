import { Card, CardContent, Stack, Typography } from '@mui/material';

const ModuleResourceCard = () => {
    return (
        <Card elevation={0} sx={{ marginBottom: "10px", padding: "30px", width: "900px", bgcolor: "light_blue.light", borderRadius: "15px" }}>
            <CardContent>
                <Stack gap="32px">
                    <Stack gap="8px">
                        <Typography variant="h2">Module Code</Typography>
                        <Typography variant="h3">Module Name</Typography>
                        <Typography variant="tag_thin">Course • Faculty • X MCs</Typography>
                        <Typography variant="tag_thin">Semester X</Typography>
                    </Stack>
                    <Stack gap="8px">
                        <Typography variant="body_bold" color="light_blue.dark">Textbook & Notes</Typography>
                        <Typography variant="body_thin">Textbook: Link to textbook (if any)</Typography>
                    </Stack>
                    <Stack gap="8px">
                        <Typography variant="body_bold" color="light_blue.dark">Software Installation</Typography>
                        <Typography variant="body_thin">Software: Link to download (if any)</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default ModuleResourceCard