// styles

// components / pages / images

// tools
import { Alert, AlertTitle, Typography, Box, Stack } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const AlertDisplay = () => {
    return (
        <Box display="flex">
            <Alert icon={<PriorityHighIcon fontSize="inherit" />} severity="info">
                <AlertTitle>
                    <Typography variant="body_bold">Important</Typography>
                </AlertTitle>
                <Stack gap="16px">
                    <Typography variant="body_thin">
                        Adding any of these modules to your module planner <b>does not guarantee</b> you a spot in the module.
                    </Typography>
                    <Typography variant="body_thin">
                        You will still have to register for the module via <a href="https://www.nus.edu.sg/coursereg/">CourseReg@EduRec</a> as
                        per normal.
                    </Typography>
                </Stack>
            </Alert>
        </Box>

    )
}

export default AlertDisplay