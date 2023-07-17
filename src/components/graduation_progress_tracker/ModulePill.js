// styles

// components / pages / images
import ModulePillMenu from '../graduation_progress_tracker/ModulePillMenu';

// tools
import { Typography, Stack, Box } from '@mui/material';

const ModulePill = ({ moduleID, moduleCode, moduleName, moduleMC, moduleCategory, yearSem, onClick }) => {
    return (
        <>
            <Box
                width="285px"
                bgcolor="light_blue.main"
                borderRadius="15px"
                margin="5px"
                padding="12px">

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Stack direction="row" alignItems="center" gap="10px">
                            <Typography variant="body_bold">{moduleCode}</Typography>
                            <Box
                                width="45px"
                                bgcolor="light_gray.main"
                                borderRadius="15px"
                                display="flex"
                                justifyContent="center"
                                paddingTop="3px"
                                paddingBottom="3px"
                                paddingLeft="3px"
                                paddingRight="3px">
                                <Typography variant="tiny_tag_bold" color="dark_gray.main">{moduleMC} MCs</Typography>
                            </Box>
                        </Stack>
                        <Typography variant="tag_thin">{moduleName}</Typography>
                        <Typography variant="tag_thin">{moduleCategory}</Typography>
                    </Box>
                    <ModulePillMenu 
                        moduleID={moduleID} 
                        moduleCode={moduleCode} 
                        moduleCategory={moduleCategory}
                        moduleMC={moduleMC}
                        yearSem={yearSem} 
                        onMenuClick={onClick}
                     />
                </Stack>
            </Box>
        </>
    )
}

export default ModulePill