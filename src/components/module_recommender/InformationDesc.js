// styles

// components / pages / images
import ImportantDisplay from '../module_recommender/ImportantDisplay';

// tools
import React from 'react';
import _ from "lodash";
import { Box, Typography, Stack } from '@mui/material';


const InformationDesc = () => {
    return (
        <Box display="flex" flexDirection="column" gap="40px">
            <Stack borderRadius="5px" display="flex" flexDirection="column" justifyContent="space-between" gap="16px">
                <Typography variant="h4">Unsure of which modules to take?</Typography>
                <Typography variant="body_thin">
                    Here are the <b>Top 3 most enrolled modules</b> in the semester by the previous cohort.
                    You may refer to this list to support you in your module planning.
                </Typography>
            </Stack>
            <ImportantDisplay />
        </Box>
    )
}

export default InformationDesc