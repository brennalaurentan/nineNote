// styles

// components / pages / images
import RecommendedModulePill from './RecommendedModulePill';

// tools
import React, { useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import _ from "lodash";
import { v4 } from 'uuid';

const item1 = {
    moduleCode: "CS1231S",
    moduleName: "Discrete Structures",
    moduleMC: "4",
    moduleCategory: "P",
    moduleStats: "80% of students took this module last year.",
}

const item2 = {
    moduleCode: "CS1101S",
    moduleName: "Programming Methodology I",
    moduleMC: "4",
    moduleCategory: "P",
    moduleStats: "90% of students took this module last year.",
}

const item3 = {
    moduleCode: "IS1108",
    moduleName: "Digital Ethics and Data Privacy",
    moduleMC: "4",
    moduleCategory: "P",
    moduleStats: "70% of students took this module last year.",
}

const item4 = {
    moduleCode: "CS2030S",
    moduleName: "Programming Methodology II",
    moduleMC: "4",
    moduleCategory: "P",
    moduleStats: "70% of students took this module last year.",
}

const item5 = {
    moduleCode: "CS2040S",
    moduleName: "Data Structures and Algorithms",
    moduleMC: "4",
    moduleCategory: "P",
    moduleStats: "65% of students took this module last year.",
}

const item6 = {
    moduleCode: "MA2001",
    moduleName: "Linear Algebra",
    moduleMC: "4",
    moduleCategory: "P",
    moduleStats: "60% of students took this module last year.",
}

const RecommendedModules = () => {

    const state = {
        "Y1 S1": {
            title: "Y1 S1",
            items: [item1, item2, item3]
        },
        "Y1 S2": {
            title: "Y1 S2",
            items: [item4, item5, item6]
        },
        "Y2 S1": {
            title: "Y2 S1",
            items: [item1, item2, item3]
        },
        "Y2 S2": {
            title: "Y2 S2",
            items: [item4, item5, item6]
        },
        "Y3 S1": {
            title: "Y3 S1",
            items: [item1, item2, item3]
        },
        "Y3 S2": {
            title: "Y3 S2",
            items: [item4, item5, item6]
        },
        "Y4 S1": {
            title: "Y4 S1",
            items: [item1, item2, item3]
        },
        "Y4 S2": {
            title: "Y4 S2",
            items: [item4, item5, item6]
        },
    }

    const addModuleToPlanner = (moduleCode, moduleName, moduleMC, yearSem) => {
        console.log("Module Added: " + moduleCode);
        console.log("Year and Semester: " + yearSem);
        // setState(prev => {
        //     return {
        //         ...prev,
        //         [yearSem]: {
        //             title: yearSem,
        //             items: [
        //                 {
        //                     moduleID: v4(),
        //                     moduleCode: moduleCode,
        //                     moduleName: moduleName,
        //                     moduleMC: moduleMC,
        //                     moduleCategory: "P"
        //                 },
        //                 ...prev[yearSem].items
        //             ]
        //         }
        //     }
        // })
    }

    return (
        <Stack gap="32px" ml="400px" width="100vw">
            <Typography variant="h3">Recommended Modules</Typography>
            <Stack direction="row" gap="32px" display="flex" flexWrap="wrap">
                {_.map(state, (data, key) => {
                    return (
                        <>
                            <Box bgcolor="yellow.light" padding="30px" borderRadius="30px" display="flex" flexDirection="column" gap="30px">
                                <Stack direction="column" display="flex" justifyContent="space-between" alignItems="center" marginTop="5px" gap="16px">
                                    <Typography variant="body_bold">{data.title}</Typography>
                                    {data.items.map((el, index) => {
                                        return (
                                            <RecommendedModulePill
                                                moduleCode={el.moduleCode}
                                                moduleName={el.moduleName}
                                                moduleMC={el.moduleMC}
                                                moduleStats={el.moduleStats}
                                                yearSem={data.title}
                                                onClick={addModuleToPlanner}
                                            />
                                        )
                                    })}
                                </Stack>
                            </Box>
                        </>
                    )
                })}
            </Stack>
        </Stack >
    )
}

export default RecommendedModules