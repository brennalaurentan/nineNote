import { Card, CardContent, Typography, Stack } from '@mui/material';

const ModulePill = () => {
    return (
        <>
            <Card sx={{ width: "300px", height: "70px", bgcolor: "light_blue.main", borderRadius: "15px" }}>
                <CardContent>
                    <Stack direction="row" alignItems="center" display="flex" justifyContent="space-between">
                        <Typography variant="body_bold">Module Code</Typography>
                        <Typography variant="tag_bold">X MCs</Typography>
                    </Stack>
                    <Typography variant="tag_thin">Module Name</Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default ModulePill