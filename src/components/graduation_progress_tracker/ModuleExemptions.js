// styles

// components / pages / images
import ModulePill from './ModulePill';
import ButtonDialog from './ButtonDialog';

// tools
import { Typography, Box, Stack } from '@mui/material';

const ModuleExemptions = () => {
    return (
        <Stack gap="32px">
            <Typography variant="h3">Module Exemptions</Typography>
            <Box bgcolor="light_blue.light" padding="30px" borderRadius="30px" display="flex" flexDirection="column" gap="30px">
                <Stack direction="row" display="flex" justifyContent="flex-end">
                    <ButtonDialog
                        button_text="+ ADD NEW"
                        header="Add Module Exemptions"
                        text="Search for your exempted modules by their respective module code 
                        and add them to your module exemptions!"/>
                </Stack>
                <Box display="flex" flexWrap="wrap" gap="30px">
                    <ModulePill code={"Module Code"} name={"Module Name"} mc={"4"}/>
                </Box>
            </Box>
        </Stack>
    )
}

export default ModuleExemptions