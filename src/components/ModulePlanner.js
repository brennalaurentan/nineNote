import * as React from 'react';
import MainButton from '../components/MainButton';
import ModulePill from '../components/ModulePill';
import ButtonDialog from './ButtonDialog';
import { Stack, Typography, Box } from '@mui/material';

const ModulePlanner = () => {
    return (
        <Stack gap="32px">
            <Stack direction="row" display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h3">Module Planner</Typography>
                <MainButton type="contained" main_color="blue.main" value="SAVE" />
            </Stack>
            <Box bgcolor="light_blue.light" padding="30px" borderRadius="30px" display="flex" flexDirection="column" gap="30px">
                <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body_bold">Y1 S1</Typography>
                    <ButtonDialog
                        button_text="+ ADD NEW"
                        header="Add Module"
                        text="Search for your desired modules by their respective module code 
                        and add them to your module planner!"/>
                </Stack>
                <Box display="flex" flexWrap="wrap" gap="30px">
                    <ModulePill />
                    <ModulePill />
                    <ModulePill />
                    <ModulePill />
                    <ModulePill />
                    <ModulePill />
                </Box>
            </Box>
        </Stack>
    )
}

export default ModulePlanner