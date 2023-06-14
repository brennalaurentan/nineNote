// styles

// components / pages / images
import ProgressBarLabel from './ProgressBarLabel';

// tools
import { Typography, Stack } from '@mui/material';

const CreditsSelected = () => {
    return (
        <Stack gap="32px">
            <Typography variant="h3">Credits Selected</Typography>
            <ProgressBarLabel type="circular" name="Common Curriculum Requirements" />
            <ProgressBarLabel type="circular" name="Programme Requirements" />
            <ProgressBarLabel type="circular" name="Unrestricted Electives Requirements" />
        </Stack>
    )
}

export default CreditsSelected