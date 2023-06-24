// styles

// components / pages / images
import ProgressBarLabel from './ProgressBarLabel';
// tools
import { Typography, Stack } from '@mui/material';

const GraduationStatus = ({ numerator, denominator }) => {
    return (
        <Stack gap="32px">
            <Typography variant="h3">Graduation Status</Typography>
            <ProgressBarLabel type="linear" numerator={numerator} denominator={denominator} />
        </Stack>
    )
}

export default GraduationStatus