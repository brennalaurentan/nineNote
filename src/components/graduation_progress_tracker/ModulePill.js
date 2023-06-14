// styles

// components / pages / images

// tools
import { Card, CardContent, Typography, Stack } from '@mui/material';

const ModulePill = ({code, name, mc}) => {
    return (
        <>
            <Card sx={{ width: "300px", height: "70px", bgcolor: "light_blue.main", borderRadius: "15px", marginBottom: "20px"}}>
                <CardContent>
                    <Stack direction="row" alignItems="center" display="flex" justifyContent="space-between">
                        <Typography variant="body_bold">{code}</Typography>
                        <Typography variant="tag_bold">{mc} MCs</Typography>
                    </Stack>
                    <Typography variant="tag_thin">{name}</Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default ModulePill