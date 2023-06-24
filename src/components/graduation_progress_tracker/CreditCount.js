// styles

// components / pages / images

// tools
import { Box, Typography, Stack } from '@mui/material';

const CreditCount = ({ moduleArray, calculateCredits }) => {
    // const totalCredits = calculateCredits(moduleArray);

    return (
        <Stack direction="row" gap="8px" alignItems="center">
            <Box
                bgcolor="white.main"
                width="30px"
                height="25px"
                borderRadius="5px"
                display="flex"
                alignItems="center"
                justifyContent="center">
                <Typography variant="body_bold">4</Typography>
            </Box>
            <Typography variant="body_bold">MCs</Typography>
        </Stack>
    )
}

export default CreditCount