// styles

// components / pages / images

// tools
import { Alert, AlertTitle, Typography, Box, Stack } from '@mui/material';
import Report from '@mui/icons-material/Report';

const ThingsToNote = () => {
    return (
        <Box display="flex">
            <Alert icon={<Report fontSize="inherit" />} severity="warning">
                <AlertTitle>
                    <Typography variant="tag_bold">Important</Typography>
                </AlertTitle>
                <Stack gap="16px">
                    <Typography variant="tag_thin">
                        Pre-requisites are not accounted for. You may 
                        find the respective module pre-requisites 
                        on <a href='https://nusmods.com/courses?sem[0]=1&sem[1]=2&sem[2]=3&sem[3]=4'>NUSMODS</a>.
                    </Typography>
                </Stack>
            </Alert>
        </Box>
    )
}

export default ThingsToNote