// styles

// components / pages / images

// tools
import { Alert, AlertTitle, Typography, Box, Stack } from '@mui/material';
import Report from '@mui/icons-material/Report';

const ImportantDisplay = () => {
    return (
        <Box display="flex">
            <Alert icon={<Report fontSize="inherit" />} severity="warning">
                <AlertTitle>
                    <Typography variant="tag_bold">Important</Typography>
                </AlertTitle>
                <Stack gap="16px">
                    <Typography variant="tag_thin">
                        Adding any of these modules to your module planner <b>does not guarantee</b> you a spot in the module.
                    </Typography>
                    <Typography variant="tag_thin">
                        You will still have to register for the module via <a href="https://www.nus.edu.sg/coursereg/">CourseReg@EduRec</a> as
                        per normal.
                    </Typography>
                </Stack>
            </Alert>
        </Box>
    )
}

export default ImportantDisplay