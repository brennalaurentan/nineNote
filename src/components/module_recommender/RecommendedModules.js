// styles

// components / pages / images
import RecommendedModulePill from '../module_recommender/RecommendedModulePill';

// tools
import _ from "lodash";
import { v4 } from 'uuid';
import { useState, useEffect } from 'react';
import { Box, Typography, Stack, Snackbar, Alert } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../others/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const RecommendedModules = ({ yearData }) => {

    // handles currently signed-in user
    const [user, setUser] = useState({});

    // function to get the currently signed-in user
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [])

    // snackbar state
    const [openModuleAddedSuccessSnackBar, setOpenModuleAddedSuccessSnackBar] = useState(false);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenModuleAddedSuccessSnackBar(false);
    }

    const [modulesBySemester, setModulesBySemester] = useState({});

    useEffect(() => {
        async function loadSemesterModules() {
            const allModulesCollectionRef = collection(db, `users/${user.email}/modules`);
            const allModulesSnapshot = await getDocs(allModulesCollectionRef);

            try {
                let y1s1Mods = [];
                let y1s2Mods = [];
                let y1st1Mods = [];
                let y1st2Mods = [];
                let y2s1Mods = [];
                let y2s2Mods = [];
                let y2st1Mods = [];
                let y2st2Mods = [];
                let y3s1Mods = [];
                let y3s2Mods = [];
                let y3st1Mods = [];
                let y3st2Mods = [];
                let y4s1Mods = [];
                let y4s2Mods = [];
                let y4st1Mods = [];
                let y4st2Mods = [];
                allModulesSnapshot.forEach(module => {
                    const newItem = {
                        moduleID: module.data().moduleID,
                        moduleCode: module.data().moduleCode,
                        moduleName: module.data().moduleName,
                        moduleMC: module.data().moduleMC,
                        moduleCategory: module.data().moduleCategory
                    }

                    switch (module.data().yearSem) {
                        case "Y1S1":
                            y1s1Mods.push(newItem);
                            break;
                        case "Y1S2":
                            y1s2Mods.push(newItem);
                            break;
                        case "Y1ST1":
                            y1st1Mods.push(newItem);
                            break;
                        case "Y1ST2":
                            y1st2Mods.push(newItem);
                            break;
                        case "Y2S1":
                            y2s1Mods.push(newItem);
                            break;
                        case "Y2S2":
                            y2s2Mods.push(newItem);
                            break;
                        case "Y2ST1":
                            y2st1Mods.push(newItem);
                            break;
                        case "Y2ST2":
                            y2st2Mods.push(newItem);
                            break;
                        case "Y3S1":
                            y3s1Mods.push(newItem);
                            break;
                        case "Y3S2":
                            y3s2Mods.push(newItem);
                            break;
                        case "Y3ST1":
                            y3st1Mods.push(newItem);
                            break;
                        case "Y3ST2":
                            y3st2Mods.push(newItem);
                            break;
                        case "Y4S1":
                            y4s1Mods.push(newItem);
                            break;
                        case "Y4S2":
                            y4s2Mods.push(newItem);
                            break;
                        case "Y4ST1":
                            y4st1Mods.push(newItem);
                            break;
                        case "Y4ST2":
                            y4st2Mods.push(newItem);
                            break;
                    }
                })

                let newState = {
                    "Y1 S1": { title: "Y1 S1", items: y1s1Mods },
                    "Y1 S2": { title: "Y1 S2", items: y1s2Mods },
                    "Y1 ST1": { title: "Y1 ST1", items: y1st1Mods },
                    "Y1 ST2": { title: "Y1 ST2", items: y1st2Mods },
                    "Y2 S1": { title: "Y2 S1", items: y2s1Mods },
                    "Y2 S2": { title: "Y2 S2", items: y2s2Mods },
                    "Y2 ST1": { title: "Y2 ST1", items: y2st1Mods },
                    "Y2 ST2": { title: "Y2 ST2", items: y2st2Mods },
                    "Y3 S1": { title: "Y3 S1", items: y3s1Mods },
                    "Y3 S2": { title: "Y3 S2", items: y3s2Mods },
                    "Y3 ST1": { title: "Y3 ST1", items: y3st1Mods },
                    "Y3 ST2": { title: "Y3 ST2", items: y3st2Mods },
                    "Y4 S1": { title: "Y4 S1", items: y4s1Mods },
                    "Y4 S2": { title: "Y4 S2", items: y4s2Mods },
                    "Y4 ST1": { title: "Y4 ST1", items: y4st1Mods },
                    "Y4 ST2": { title: "Y4 ST2", items: y4st2Mods }
                };

                setModulesBySemester(newState);

                console.log("new state: ", newState);
                console.log("modules by semester: ");
                console.log(modulesBySemester);
                // console.log("static modules by semester: ");
                // console.log(state);

            } catch (error) {
                console.log(error.message);
            }
        }
        loadSemesterModules();
    }, [user]);

    const addModule = (moduleCode, moduleName, moduleMC, yearSem) => {
        console.log("Module Added: " + moduleCode);
        console.log("Year and Semester: " + yearSem);
        setModulesBySemester(prev => {
            return {
                ...prev,
                [yearSem]: {
                    title: yearSem,
                    items: [
                        {
                            moduleID: v4(),
                            moduleCode: moduleCode,
                            moduleName: moduleName,
                            moduleMC: moduleMC
                        },
                        ...prev[yearSem].items
                    ]
                }
            }
        })
        console.log("current modules: ", modulesBySemester)
        console.log(moduleCode, "is added from recommender to", yearSem);
        setOpenModuleAddedSuccessSnackBar(true);
    }

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
                                        moduleStats={el.moduleStats}
                                        yearSem={data.title}
                                        onClick={addModule}
                                    />
                                )
                            })}
                        </Stack>
                    </Box>
                )
            })}

            {/* SUCCESS SNACKBAR */}
            {/* snackbar displays only when module is added to module planner */}
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openModuleAddedSuccessSnackBar}
                autoHideDuration={3000}
                onClose={handleCloseSnackBar}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    <Typography variant="tag_thin">
                        Module has been added to module planner.
                    </Typography>
                </Alert>
            </Snackbar>
        </>
    )
}

export default RecommendedModules