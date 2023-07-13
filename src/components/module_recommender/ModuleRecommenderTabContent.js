// styles

// components / pages / images
import RecommendedModulePill from '../module_recommender/RecommendedModulePill';
import InformationDesc from './InformationDesc';
import RecommendedModules from './RecommendedModules';

// tools
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import { Box, Typography, Stack } from '@mui/material';
import { getDoc, getDocs, doc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../others/firebase';

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

const MyProfileTabContent = ({ value }) => {
    const [recommendedModulesBySemester, setRecommendedModulesBySemester] = useState({
        "Y1 S1": {
            title: "Y1 S1",
            items: []
        },
        "Y1 S2": {
            title: "Y1 S2",
            items: []
        },
        "Y2 S1": {
            title: "Y2 S1",
            items: []
        },
        "Y2 S2": {
            title: "Y2 S2",
            items: []
        },
        "Y3 S1": {
            title: "Y3 S1",
            items: []
        },
        "Y3 S2": {
            title: "Y3 S2",
            items: []
        },
        "Y4 S1": {
            title: "Y4 S1",
            items: []
        },
        "Y4 S2": {
            title: "Y4 S2",
            items: []
        },
    });

    // function to retrieve recommended modules from firebase and update state
    useEffect(() => {
        async function retrieveRecommendedModules() {
            const semestersDocumentRef = collection(db, `recommendedModules`);
            const allSemestersDocumentSnapshot = await getDocs(semestersDocumentRef);
            try {
                let recommendedModulesForAllSemesters = {
                    "Y1 S1": {
                        title: "Y1 S1",
                        items: []
                    },
                    "Y1 S2": {
                        title: "Y1 S2",
                        items: []
                    },
                    "Y2 S1": {
                        title: "Y2 S1",
                        items: []
                    },
                    "Y2 S2": {
                        title: "Y2 S2",
                        items: []
                    },
                    "Y3 S1": {
                        title: "Y3 S1",
                        items: []
                    },
                    "Y3 S2": {
                        title: "Y3 S2",
                        items: []
                    },
                    "Y4 S1": {
                        title: "Y4 S1",
                        items: []
                    },
                    "Y4 S2": {
                        title: "Y4 S2",
                        items: []
                    },
                };
                allSemestersDocumentSnapshot.forEach(async semester => {
                    const semesterLabel = semester.id.replace(/^(.{2})(.*)$/, "$1 $2");

                    let modulesForThisSemester = [];
                    let moduleIndex = 1;

                    while (moduleIndex <= 3) {
                        const moduleDetailsRef = doc(db, `recommendedModules/${semester.id}/module_${moduleIndex}`, "moduleDetails");
                        const moduleDetailsSnap = await getDoc(moduleDetailsRef);
                        const cohortStatisticsRef = doc(db, `recommendedModules/${semester.id}/module_${moduleIndex}`, "cohortStatistics");
                        const cohortStatisticsSnap = await getDoc(cohortStatisticsRef);

                        const enrollmentDecimal = cohortStatisticsSnap.data().cohortTaken / cohortStatisticsSnap.data().cohortSize * 100;
                        const enrollmentPercentage = Math.round(enrollmentDecimal * 10) / 10;

                        const newItem = {
                            moduleCode: moduleDetailsSnap.data().moduleCode,
                            moduleName: moduleDetailsSnap.data().moduleName,
                            moduleMC: moduleDetailsSnap.data().moduleMC,
                            moduleStats: enrollmentPercentage + "% of students took this module last year.",
                        }
                        modulesForThisSemester.push(newItem);
                        moduleIndex++;
                    }

                    const newSemesterObject = {
                        title: semesterLabel,
                        items: modulesForThisSemester
                    };
                    recommendedModulesForAllSemesters[semesterLabel] = newSemesterObject;
                    setRecommendedModulesBySemester(recommendedModulesForAllSemesters)
                })
                console.log("all recommended modules: ", recommendedModulesForAllSemesters);
            } catch (error) {
                console.log(error.message);
            }
        }
        retrieveRecommendedModules();
    }, [])

    // restructured data from retrieved recommended modules from firebase
    const year1 = {
        "Y1 S1": recommendedModulesBySemester['Y1 S1'],
        "Y1 S2": recommendedModulesBySemester['Y1 S2'],
    }

    const year2 = {
        "Y2 S1": recommendedModulesBySemester['Y2 S1'],
        "Y2 S2": recommendedModulesBySemester['Y2 S2'],
    }

    const year3 = {
        "Y2 S1": recommendedModulesBySemester['Y3 S1'],
        "Y3 S2": recommendedModulesBySemester['Y3 S2'],
    }

    const year4 = {
        "Y4 S1": recommendedModulesBySemester['Y4 S1'],
        "Y4 S2": recommendedModulesBySemester['Y4 S2'],
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