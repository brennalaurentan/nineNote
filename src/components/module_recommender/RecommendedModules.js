// styles

// components / pages / images
import RecommendedModulePill from '../module_recommender/RecommendedModulePill';

// tools
import _ from "lodash";
import { Box, Typography, Stack } from '@mui/material';

const RecommendedModules = ({ yearData }) => {
    return (
        <>
            {_.map(yearData, (data, key) => {
                return (
                    <Box bgcolor="yellow.light" padding="30px" borderRadius="30px" display="flex" flexDirection="column" gap="30px">
                        <Stack direction="column" display="flex" justifyContent="space-between" alignItems="center" marginTop="5px" gap="16px">
                            <Typography variant="h4">{data.title}</Typography>
                            {data.items.map((el, index) => {
                                return (
                                    <RecommendedModulePill
                                        moduleCode={el.moduleCode}
                                        moduleName={el.moduleName}
                                        moduleMC={el.moduleMC}
                                        moduleCategory={el.moduleCategory}
                                        moduleStats={el.moduleStats}
                                        yearSem={data.title}
                                    />
                                )
                            })}
                        </Stack>
                    </Box>
                )
            })}
        </>
    )
}

export default RecommendedModules