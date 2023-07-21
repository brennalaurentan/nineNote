// styles

// components / pages / images
import RecommendedModulePillMenu from '../module_recommender/RecommendedModulePillMenu';

// tools
import { Typography, Stack, Box } from '@mui/material';

const RecommendedModulePill = ({ moduleCode, moduleName, moduleMC, moduleCategory, moduleStats, yearSem }) => {
    return (
        <>
            <Box
                width="350px"
                bgcolor="yellow.main"
                borderRadius="15px"
                margin="5px"
                padding="12px">

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack gap="4px">
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
                                paddingLeft="6px"
                                paddingRight="6px">
                                <Typography variant="tiny_tag_bold" color="dark_gray.main">{moduleMC} MCs</Typography>
                            </Box>
                        </Stack>
                        <Typography variant="tag_thin">{moduleName}</Typography>
                        <Typography variant="tag_bold" color="yellow.dark">{moduleStats}</Typography>
                    </Stack>
                    <RecommendedModulePillMenu
                        moduleCode={moduleCode}
                        moduleName={moduleName}
                        moduleMC={moduleMC}
                        moduleCategory={moduleCategory}
                        yearSem={yearSem}
                    />
                </Stack>
            </Box>
        </>
    )
}

export default RecommendedModulePill