// styles

// components / pages / images
import MainButton from '../common/MainButton';
import ModulePill from './ModulePill';
import ButtonDialog from './ButtonDialog';

// tools
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Box, Container } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from "lodash";
import { v4 } from 'uuid';
import { collection, getDocs, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../others/firebase';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

const SemContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap"
}));

const item1 = {
    moduleID: v4(),
    moduleCode: "CS1231S",
    moduleName: "Discrete Structures",
    moduleMC: "4",
    moduleCategory: "P"
}

const item2 = {
    moduleID: v4(),
    moduleCode: "CS1101S",
    moduleName: "Programming Methodology I",
    moduleMC: "4",
    moduleCategory: "P"
}

const moduleGroupsArray = [
    {   
        groupName: "computingEthics",
        collectionPath: '/graduationRequirements/computerScience/commonCurriculum/computingEthics/computingEthics'
    },
    {
        groupName: "crossdisciplinaryEducation",
        collectionPath: '/graduationRequirements/computerScience/commonCurriculum/crossdisciplinaryEducation/crossdisciplinaryEducation'
    },
    {
        groupName: "interdisciplinaryEducation",
        collectionPath: '/graduationRequirements/computerScience/commonCurriculum/interdisciplinaryEducation/interdisciplinaryEducation'
    },
    {
        groupName: "communitiesAndEngagement",
        collectionPath: '/graduationRequirements/computerScience/commonCurriculum/universityLevel/communitiesAndEngagement'
    },
    {
        groupName: "critiqueAndExpression",
        collectionPath: '/graduationRequirements/computerScience/commonCurriculum/universityLevel/critiqueAndExpression'
    },
    {
        groupName: "culturesAndConnections",
        collectionPath: '/graduationRequirements/computerScience/commonCurriculum/universityLevel/culturesAndConnections'
    },
    {
        groupName: "dataLiteracy",
        collectionPath: '/graduationRequirements/computerScience/commonCurriculum/universityLevel/dataLiteracy'
    },
    {
        groupName: "digitalLiteracy",
        collectionPath: '/graduationRequirements/computerScience/commonCurriculum/universityLevel/digitalLiteracy'
    },
    {
        groupName: "singaporeStudies",
        collectionPath: '/graduationRequirements/computerScience/commonCurriculum/universityLevel/singaporeStudies'
    },
    {
        groupName: "algorithmsAndTheory_electives",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/algorithmsAndTheory/electives'
    },
    {
        groupName: "algorithmsAndTheory_primaries",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/algorithmsAndTheory/primaries'
    },
    {
        groupName: "artificialIntelligence_electives",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/artificialIntelligence/electives'
    },
    {
        groupName: "artificialIntelligence_primaries",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/artificialIntelligence/primaries'
    },
    {
        groupName: "computerGraphicsAndGames_electives",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/computerGraphicsAndGames/electives'
    },
    {
        groupName: "computerGraphicsAndGames_primaries",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/computerGraphicsAndGames/primaries'
    },
    {
        groupName: "computerSecurity_electives",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/computerSecurity/electives'
    },
    {
        groupName: "computerSecurity_primaries",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/computerSecurity/primaries'
    },
    {
        groupName: "databaseSystems_electives",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/databaseSystems/electives'
    },
    {
        groupName: "databaseSystems_primaries",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/databaseSystems/primaries'
    },
    {
        groupName: "multimediaInformationRetrieval_electives",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/multimediaInformationRetrieval/primaries'
    },
    {
        groupName: "multimediaInformationRetrieval_primaries",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/multimediaInformationRetrieval/primaries'
    },
    {
        groupName: "networkingAndDistributedSystems_electives",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/networkingAndDistributedSystems/electives'
    },
    {
        groupName: "networkingAndDistributedSystems_primaries",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/networkingAndDistributedSystems/primaries'
    },
    {
        groupName: "focusAreas_others",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/others/others'
    },
    {
        groupName: "parallelComputing_electives",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/parallelComputing/electives'
    },
    {
        groupName: "parallelComputing_primaries",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/parallelComputing/primaries'
    },
    {
        groupName: "programmingLanguages_electives",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/programmingLanguages/electives'
    },
    {
        groupName: "programmingLanguages_primaries",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/programmingLanguages/primaries'
    },
    {
        groupName: "softwareEngineering_electives",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/softwareEngineering/electives'
    },
    {
        groupName: "softwareEngineering_primaries",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/softwareEngineering/primaries'
    },
    {
        groupName: "industryExperience",
        collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/industryExperience'
    },
    {
        groupName: "mathematicsAndSciences",
        collectionPath: '/graduationRequirements/computerScience/programme/mathematicsAndSciences/mathematicsAndSciences'
    },
    {
        groupName: "foundation",
        collectionPath: '/graduationRequirements/computerScience/programme/foundation/foundation'
    }
];

/*
var request = new XMLHttpRequest();
request.open('GET', 'https://api.nusmods.com/v2/2022-2023/moduleList.json', true);
request.onload = function () {
    var data = JSON.parse(this.response);
    data.forEach((module) => {
        console.log(module.moduleCode);
        let moduleCount = 1;
        // get foundation mods (32MCs)
        if (module.moduleCode === "CS1231S" ||
            module.moduleCode === "CS2030S" ||
            module.moduleCode === "CS2040S" ||
            module.moduleCode === "CS2100" ||
            module.moduleCode === "CS2101" ||
            module.moduleCode === "CS2103T" ||
            module.moduleCode === "CS2106" ||
            module.moduleCode === "CS2109S" ||
            module.moduleCode === "CS3230") {
            // create new collection with new module details
            setDoc(doc(db, `graduationRequirements/computerScience/programme/`, `module_${moduleCount}`), {
                moduleCode: module.moduleCode,
                moduleName: module.title,
                moduleMC: "4"
            });
            moduleCount++;
            console.log("module created");
        }
    });
}
request.send();
*/

const ModulePlanner = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    const currentUserEmail = user.email;
    
    const [state, setState] = useState({
        "Y1 S1": {
            title: "Y1 S1",
            items: [item1, item2]
        },
        "Y1 S2": {
            title: "Y1 S2",
            items: []
        },
        "Y1 ST1": {
            title: "Y1 ST1",
            items: []
        },
        "Y1 ST2": {
            title: "Y1 ST2",
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
        "Y2 ST1": {
            title: "Y2 ST1",
            items: []
        },
        "Y2 ST2": {
            title: "Y2 ST2",
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
        "Y3 ST1": {
            title: "Y3 ST1",
            items: []
        },
        "Y3 ST2": {
            title: "Y3 ST2",
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
        "Y4 ST1": {
            title: "Y4 ST1",
            items: []
        },
        "Y4 ST2": {
            title: "Y4 ST2",
            items: []
        }
    })

    const [modulesBySemester, setModulesBySemester] = useState({});
    let userSemesterCount = 0;
    let semesterModulesArray = [];

    // function which takes in a path and returns an array of the modules in 
    // that path in the database (graduation requirement modules, to obtain module details)
    async function retrieveModulesFromCollectionPath(collectionPath) {
        const arrayOfModules = [];
        const collectionRef = collection(db, collectionPath);
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
            // each module in the database has the following details:
            // moduleCode, moduleMC, moduleName
            const newModule = {
                "moduleCode": doc.data().moduleCode,
                "moduleMC": doc.data().moduleMC,
                "moduleName": doc.data().moduleName
            }
            arrayOfModules.push(newModule);
        })
        return arrayOfModules;
    }
    //console.log("Testing retrieveModuleList function:");
    //console.log(retrieveModulesFromCollectionPath(`/graduationRequirements/computerScience/commonCurriculum/computingEthics/computingEthics`));

    // function which takes in an array of objects, each object representing one module collection in the database
    // each object has 2 properties: groupName and collectionPath
    function retrieveAllModules(arrayOfModuleGroups) {
        let arrayOfAllModules = [];
        let arrayOfModules = [];
        (arrayOfModuleGroups).forEach(courseCollection => {
            // retrieve modules in an array
            arrayOfModules = retrieveModulesFromCollectionPath(courseCollection.collectionPath);
            // add arrayOfModules to arrayOfAllModules
            arrayOfAllModules = arrayOfAllModules.concat(arrayOfModules);
        });
        return arrayOfAllModules;
    }
    //let testArray = retrieveAllModules(moduleGroupsArray);
    //console.log(testArray);

    function retrieveGradProgressCollectionPath(userEmail, moduleCategory) {
        try {
            let gradProgressCollectionPath = "";
            moduleGroupsArray.forEach((moduleGroup) => {
                if (moduleGroup === moduleCategory) {
                    gradProgressCollectionPath = moduleGroup.collectionPath;
                }
            });
            // replace ! in the path obtained with the user's email to get the correct collection path
            gradProgressCollectionPath = gradProgressCollectionPath.replace(/!/g, userEmail);
            // note though, that in order to access the fields, you need to access the document within the collection
            // which would be (collectionPath)/(moduleCategory). so idk what you gna do with just the collection path lol
            return gradProgressCollectionPath;
        }
        catch (error) {
            console.log(error.message);
        }
    }
    retrieveGradProgressCollectionPath("gorilla@gmail.com", "foundation");

    async function updateCompletedModulesArray(moduleCategory, collectionPath, moduleCode) {
        try {
            let currentCreditsCompleted = "";
            let currentCreditsToMeet = "";
            let currentModulesTakenArray = [];
            // obtain current modules completed array (for the specified group)
            const querySnapshot = await getDocs(collection(db, collectionPath));
            // wait but how do you obtain the correct specified group...
            // can cycle through the documents but don't know how to 'identify the correct one'
            // since moduleCat is a QuerySnapshot and not a string name...
            // able to setDoc (since the moduleCategory and collectionPath is definite / given)
            // but for getDocs, if there's more than one document in the collection, what condition
            // to set in order to go into the loop when it's the right document?

            /*
            querySnapshot.forEach((moduleCat) => {
                // condition below does not work. need to find a new way
                if (moduleCat === moduleCategory) {
                    currentCreditsCompleted = moduleCat.data().creditsCompleted;
                    currentCreditsToMeet = moduleCat.data().creditsToMeet;
                    currentModulesTakenArray = moduleCat.data().modulesTaken;
                }
            });
            currentModulesTakenArray.push(moduleCode);
            setDoc(doc(db, collectionPath, moduleCategory), {
                creditsCompleted: currentCreditsCompleted,
                creditsToMeet: currentCreditsToMeet,
                modulesTaken: currentModulesTakenArray
            });
            console.log("updated modules taken array");
            */

        }
        catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        async function loadSemesterModules() {
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                const currentUserEmail = user.email;

                const semestersCollectionRef = collection(db, `users/${user.email}/modules`);
                const allSemestersSnapshot = await getDocs(semestersCollectionRef);

                // 16 docs, correct
                console.log("allSemestersSnapshot: " + allSemestersSnapshot);
                console.log(allSemestersSnapshot);
                let newState = {
                    "Y1 S1": {
                        title: "Y1 S1",
                        items: []
                    },
                    "Y1 S2": {
                        title: "Y1 S2",
                        items: []
                    },
                    "Y1 ST1": {
                        title: "Y1 ST1",
                        items: []
                    },
                    "Y1 ST2": {
                        title: "Y1 ST2",
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
                    "Y2 ST1": {
                        title: "Y2 ST1",
                        items: []
                    },
                    "Y2 ST2": {
                        title: "Y2 ST2",
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
                    "Y3 ST1": {
                        title: "Y3 ST1",
                        items: []
                    },
                    "Y3 ST2": {
                        title: "Y3 ST2",
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
                    "Y4 ST1": {
                        title: "Y4 ST1",
                        items: []
                    },
                    "Y4 ST2": {
                        title: "Y4 ST2",
                        items: []
                    }
                };

                // in database: Y1S1, Y1S2, Y1ST1, Y1ST2, ..., Y4ST2
                allSemestersSnapshot.forEach(async semester => {
                    // log each of the 16 semesters
                    console.log("semester: " + semester.id);
                    // line below only retrieves the numModules field from each of the semesters
                    console.log(semester.data());
                    // still haven't figured out a way to get module_1, module_2 etc
                    // (they're collections)

                    // create semesterLabel: obtain "Y1 S1" from "Y1S1" by adding a space
                    const semesterLabel = semester.id.replace(/^(.{2})(.*)$/, "$1 $2");

                    const numModules = semester.data().numModules;

                    // create 'items' array to store all the modules for the particular semester
                    let modulesForThisSemester = [];

                    // moduleIndex counts upwards from 1, sequentially but may skip some numbers
                    // depending on whether the module_x document exists
                    // (moduleIndex can count up to a number that exceeds numModules)
                    let moduleIndex = 1;

                    // moduleCount counts upwards from 1, sequentially
                    let moduleCount = 1;

                    while (moduleCount <= numModules) {
                        const tryFindModuleDocumentRef = doc(db, `users/${currentUserEmail}/modules/${semester.id}/module_${moduleIndex}`, "moduleDetails");
                        //const tryFindModuleDocument = await getDoc(collection(db, `users/${currentUserEmail}/modules/${semester.id}/module_${moduleIndex}`));
                        const tryFindModuleDocumentSnap = await getDoc(tryFindModuleDocumentRef);
                        console.log("moduleCount is " + moduleCount + ", moduleIndex is " + moduleIndex);
                        // if module_x document exists
                        if (tryFindModuleDocumentSnap.exists()) {
                            // console.log("module_" + moduleIndex + " moduleCode is: " + tryFindModuleDocumentSnap.data().moduleCode);
                            // console.log("module_" + moduleIndex + " moduleName is: " + tryFindModuleDocumentSnap.data().moduleName);
                            // console.log("module_" + moduleIndex + " moduleMC is: " + tryFindModuleDocumentSnap.data().moduleMC);
                            // obtain fields in moduleDetails since the module document exists
                            const newItem = {
                                moduleID: tryFindModuleDocumentSnap.data().moduleID,
                                moduleCode: tryFindModuleDocumentSnap.data().moduleCode,
                                moduleName: tryFindModuleDocumentSnap.data().moduleName,
                                moduleMC: tryFindModuleDocumentSnap.data().moduleMC,
                                //moduleCategory: tryFindModuleDocumentSnap.data().moduleCategory
                            }
                            // push object with retrieved module details into the array of items
                            // for the semester
                            modulesForThisSemester.push(newItem);

                            // add one to moduleCount to signify another module 'found'
                            moduleCount++;
                            console.log("module_" + moduleIndex + " exists, loaded");

                            console.log("modules for " + semesterLabel + " : " + modulesForThisSemester);
                            console.log("static modules for " + semesterLabel + " : " + [item1, item2]);
                        }
                        // moduleIndex gets incremented regardless of whether the
                        // module document exists or not
                        moduleIndex++;
                    }

                    // create new object for semester, to be stored in main newState object
                    const newSemesterObject = {
                        title: semesterLabel,
                        items: modulesForThisSemester
                    };

                    // add new object to main newState object
                    newState[semesterLabel] = newSemesterObject;
                    setModulesBySemester(newState);
                })
                
                console.log("modules by semester: ");
                console.log(modulesBySemester);
                console.log("static modules by semester: ");
                console.log(state);

            } catch (error) {
                console.log(error.message);
            }
        }
        loadSemesterModules();
    }, []);

    // function to mass update module documents in the database
    useEffect(() => {
        async function addModuleCategories(categoryName, collectionPath) {
            // collectionPath contains one or more documents
            // to each document in the collection, we want to add the field 'moduleCategory: categoryName'
            // all documents have the same format, with each document having the following fields:
            // moduleCode, moduleName, moduleMC
            // at the end, the document should have the following fields:
            // moduleCode, moduleName, moduleMC, moduleCategory
            try {
                let currentModuleCode = "";
                let currentModuleName = "";
                let currentModuleMC = "";

                // read collection
                const querySnapshot = await getDocs(collection(db, collectionPath));
                // cycle through each of the documents in the collection
                let moduleIndexCounter = 1;
                querySnapshot.forEach((module) => {
                    // keep track of the following existing fields 
                    // (we don't want to change these fields)
                    currentModuleCode = module.data().moduleCode;
                    currentModuleName = module.data().moduleName;
                    currentModuleMC = module.data().moduleMC;

                    // update module document with existing fields, and the new field
                    setDoc(doc(db, collectionPath, `module_${moduleIndexCounter}`), {
                        moduleCode: currentModuleCode,
                        moduleName: currentModuleName,
                        moduleMC: currentModuleMC,
                        moduleCategory: categoryName
                    });
                    console.log(categoryName + ": " + `module_${moduleIndexCounter}` + " done");
                    moduleIndexCounter++;
                })
            }
            catch (error) {
                console.log(error.message);
            }
        }
        // modify the line below to add the moduleCategory field to all modules in the specified collection
        //addModuleCategories("programmingLanguages_electives", '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/programmingLanguages/electives');
        /*
        // un-comment the block below to make modifications to all module groups in the specified array
        moduleGroupsArray.forEach((moduleGroup) => {
            addModuleCategories(moduleGroup.groupName, moduleGroup.collectionPath);
        });
        */
    }, []);

    const handleDragEnd = ({ destination, source }) => {
        console.log("from", source)
        console.log("to", destination)

        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }

        // creating a copy of item before removing from state
        const itemCopy = { ...modulesBySemester[source.droppableId].items[source.index] };
        setModulesBySemester(prev => {
            prev = { ...prev }
            // remove from previous items array
            prev[source.droppableId].items.splice(source.index, 1)
            // adding to new items array location
            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
            return prev
        })
    }

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
                            moduleMC: moduleMC,
                            moduleCategory: "P"
                        },
                        ...prev[yearSem].items
                    ]
                }
            }
        })
    }

    const deleteModule = (moduleID, moduleCode, yearSem) => {
        console.log("Module Deleted: " + moduleCode);
        console.log("Year and Semester: " + yearSem);
        setModulesBySemester(prev => {
            return {
                ...prev,
                [yearSem]: {
                    title: yearSem,
                    items: [
                        ...prev[yearSem].items.filter(module => module.id !== moduleID)
                    ]
                }
            }
        })
    }

    return (
        <Stack gap="32px" width="100vw">
            <Stack direction="row" display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h3">Module Planner</Typography>
                <MainButton type="contained" main_color="blue.main" value="SAVE" />
            </Stack>
            <DragDropContext onDragEnd={handleDragEnd}>
                {_.map(modulesBySemester, (data, key) => {
                    return (
                        <>
                            <Box bgcolor="light_blue.light" padding="30px" borderRadius="30px" display="flex" flexDirection="column" gap="30px">
                                <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center" marginTop="5px">
                                    <Typography variant="body_bold">{data.title}</Typography>
                                    <ButtonDialog
                                        button_text="+ ADD NEW"
                                        header="Add Module"
                                        text="Search for your desired modules by their respective module code 
                                        and add them to your module planner!"
                                        onSubmit={addModule}
                                        yearSem={data.title} />
                                </Stack>
                                <Droppable droppableId={key}>
                                    {(provided) => {
                                        return (
                                            <SemContainer
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {data.items.map((el, index) => {
                                                    return (
                                                        <Draggable key={el.moduleID} index={index} draggableId={el.moduleID}>
                                                            {(provided) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <ModulePill
                                                                            moduleID={el.moduleID}
                                                                            moduleCode={el.moduleCode}
                                                                            moduleName={el.moduleName}
                                                                            moduleMC={el.moduleMC}
                                                                            yearSem={data.title}
                                                                            onClick={deleteModule}
                                                                        />
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </SemContainer>
                                        )
                                    }}
                                </Droppable>
                            </Box>
                        </>
                    );
                })}
            </DragDropContext>
        </Stack >
    )
}

export default ModulePlanner