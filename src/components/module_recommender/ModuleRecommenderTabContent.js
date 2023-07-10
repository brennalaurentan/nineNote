// styles

// components / pages / images
import RecommendedModulePill from '../module_recommender/RecommendedModulePill';
import InformationDesc from './InformationDesc';

// tools
import React from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import { Box, Typography, Stack } from '@mui/material';
import RecommendedModules from './RecommendedModules';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

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

const MyProfileTabContent = ({ value }) => {
    const year1 = {
        "Y1 S1": {
            title: "Y1 S1",
            items: [item1, item2, item3]
        },
        "Y1 S2": {
            title: "Y1 S2",
            items: [item4, item5, item6]
        },
    }

    const year2 = {
        "Y2 S1": {
            title: "Y2 S1",
            items: [item1, item2, item3]
        },
        "Y2 S2": {
            title: "Y2 S2",
            items: [item4, item5, item6]
        },
    }

    const year3 = {
        "Y3 S1": {
            title: "Y3 S1",
            items: [item1, item2, item3]
        },
        "Y3 S2": {
            title: "Y3 S2",
            items: [item4, item5, item6]
        },
    }

    const year4 = {
        "Y4 S1": {
            title: "Y4 S1",
            items: [item1, item2, item3]
        },
        "Y4 S2": {
            title: "Y4 S2",
            items: [item4, item5, item6]
        },
    }

    return (
        <>
            {/* Tab 1 */}
            <TabPanel value={value} index={0}>
                <Stack direction="row" gap="64px">
                    <InformationDesc />
                    <RecommendedModules yearData={year1} />
                </Stack>
            </TabPanel>

            {/* Tab 2 */}
            <TabPanel value={value} index={1}>
                <Stack direction="row" gap="64px">
                    <InformationDesc />
                    <RecommendedModules yearData={year2} />
                </Stack>
            </TabPanel>

            {/* Tab 3 */}
            <TabPanel value={value} index={2}>
                <Stack direction="row" gap="64px">
                    <InformationDesc />
                    <RecommendedModules yearData={year3} />
                </Stack>
            </TabPanel>

            {/* Tab 4 */}
            <TabPanel value={value} index={3}>
                <Stack direction="row" gap="64px">
                    <InformationDesc />
                    <RecommendedModules yearData={year4} />
                </Stack>
            </TabPanel>
        </>
    )
}

export default MyProfileTabContent