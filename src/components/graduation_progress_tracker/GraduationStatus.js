// styles

// components / pages / images
import ProgressBarLabel from './ProgressBarLabel';

// tools
import { Typography, Stack } from '@mui/material';

const GraduationStatus = () => {
    return (
        <Stack gap="32px">
            <Typography variant="h3">Graduation Status</Typography>
            <ProgressBarLabel type="linear" />
        </Stack>
    )
}

export default GraduationStatus