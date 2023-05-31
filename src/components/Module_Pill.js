import { Card, CardContent, Typography, Grid, Stack } from '@mui/material';

const Module_Pill = () => {
    return (
        <>
            <Card sx={{ width: "300px", height: "70px", bgcolor: "blue.light", borderRadius: "15px" }}>
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

export default Module_Pill