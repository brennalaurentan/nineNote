// styles

// components / pages / images
import ProgressBarLabel from './ProgressBarLabel';

// tools
import { Typography, Stack } from '@mui/material';

const CreditsSelected = ({ ccr, ccrTotal, pr, prTotal, uer, uerTotal }) => {

    return (
        <Stack gap="32px">
            <Typography variant="h3">Credits Selected</Typography>
            <ProgressBarLabel
                type="circular"
                name="Common Curriculum Requirements"
                numerator={ccr}
                denominator={ccrTotal}
            />
            <ProgressBarLabel
                type="circular"
                name="Programme Requirements"
                numerator={pr}
                denominator={prTotal}
            />
            <ProgressBarLabel
                type="circular"
                name="Unrestricted Electives Requirements"
                numerator={uer}
                denominator={uerTotal}
            />
        </Stack>
    )
}

export default CreditsSelected