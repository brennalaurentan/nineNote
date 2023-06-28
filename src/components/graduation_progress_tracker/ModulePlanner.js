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
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../others/firebase';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const SemContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap"
}));

const item1 = {
    id: v4(),
    code: "CS1231S",
    name: "Discrete Structures",
    mc: "4",
    category: "P"
}

const item2 = {
    id: v4(),
    code: "CS1101S",
    name: "Programming Methodology I",
    mc: "4",
    category: "P"
}

const item3 = {
    id: v4(),
    code: "MA1521",
    name: "Calculus for Computing",
    mc: "4",
    category: "P"
}

const item4 = {
    id: v4(),
    code: "GEA1000",
    name: "Quantitative Reasoning with Data",
    mc: "4",
    category: "CC"
}

const item5 = {
    id: v4(),
    code: "IS2218",
    name: "Digital Plaforms for Business",
    mc: "4",
    category: "P"
}

const item6 = {
    id: v4(),
    code: "CS2030S",
    name: "Programming Methodology II",
    mc: "4",
    category: "P"
}

const item7 = {
    id: v4(),
    code: "CS2100",
    name: "Computer Organisation",
    mc: "4",
    category: "P"
}

const item8 = {
    id: v4(),
    code: "IS1108",
    name: "Digital Ethics and Data Privacy",
    mc: "4",
    category: "P"
}

const ModulePlanner = () => {

    const [state, setState] = useState({
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
    })

    const [ccrCreditsCompleted, setCCRCreditsCompleted] = useState();
    const [pCreditsCompleted, setPCreditsCompleted] = useState();
    const [ueCreditsCompleted, setUECreditsCompleted] = useState();
    
    const [modulesBySemester, setModulesBySemester] = useState({});
    let userSemesterCount = 0;
    let semesterModulesArray = [];

    useEffect(() => {
      async function loadSemesterModules() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const currentUserEmail = user.email;

        const usersCollectionRef = collection(db, "users");
        const semestersCollectionRef = collection(db, `users/${user.email}/modules`);

        const allSemestersSnapshot = getDocs(semestersCollectionRef)
          .then((allSemestersSnapshot) => {

            // 16 docs, correct
            console.log("allSemestersSnapshot: " + allSemestersSnapshot);
            console.log(allSemestersSnapshot);

            let newState = {};

            // in database: Y1S1, Y1S2, Y1ST1, Y1ST2, ..., Y4ST2
            allSemestersSnapshot.forEach(async semester => {
                // log each of the 16 semesters
                console.log("semester: " + semester.id);
                console.log(semester);

                // create semesterLabel: obtain "Y1 S1" from "Y1S1" by adding a space
                const semesterLabel = semester.id.replace(/^(.{2})(.*)$/, "$1 $2");

                // create 'items' array to store all the modules for the particular semester
                let modulesForThisSemester = [];

                // access all modules within the semester
                //const semesterDocRef = getDoc(doc(collection(db, `users/${user.email}/modules/${semester}`)));
                //const semesterDocRef = doc(db, `users/${user.email}/modules`, semester);
                //const allModulesInSemesterSnapshot = await getDocs(semesterDocRef);
                //const allModulesInSemester = collection(db, `users/${user.email}/modules`).get();
                
                // within the semester snapshot, for each module collection
                // (module_1, module_2, ...)
                /*
                allModulesInSemesterSnapshot.forEach((module) => {
                    const newItem = {
                        id: v4(),
                        code: module.doc('moduleDetails').data().moduleCode,
                        name: module.doc('moduleDetails').data().moduleName,
                        mc: module.doc('moduleDetails').data().moduleMC,
                        category: "P"
                    }
                    modulesForThisSemester.push(newItem);
                });
                */

                // create new object for semester, to be stored in main newState object
                const newSemesterObject = {
                    title: semesterLabel,
                    items: []
                };

                // add new object to main newState object
                newState[semesterLabel] = newSemesterObject;

                //const moduleCollectionRef = await getDocs(collection(db, `users/${user.email}/modules/${semester}/`));
                // retrieves all the documents in modules (each semester)
                //const moduleSnapshot = await getDocs(collection(db, `users/${user.email}/modules/`))
                
            })

            setModulesBySemester(newState);
            console.log("modules by semester: ");
            console.log(modulesBySemester);
            console.log("static modules by semester: ");
            console.log(state);
        });

      } catch (error) {
        console.log(error.message);
      }
    }
    loadSemesterModules();
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
        const itemCopy = { ...state[source.droppableId].items[source.index] };
        setState(prev => {
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
        setState(prev => {
            return {
                ...prev,
                [yearSem]: {
                    title: yearSem,
                    items: [
                        {
                            id: v4(),
                            code: moduleCode,
                            name: moduleName,
                            mc: moduleMC
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
        setState(prev => {
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
                {_.map(state, (data, key) => {
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
                                                        <Draggable key={el.id} index={index} draggableId={el.id}>
                                                            {(provided) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <ModulePill
                                                                            moduleID={el.id}
                                                                            moduleCode={el.code}
                                                                            moduleName={el.name}
                                                                            moduleMC={el.mc}
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