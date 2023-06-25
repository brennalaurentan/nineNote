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
import { collection, getDocs } from 'firebase/firestore';
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

        const semestersSnapshot = getDocs(semestersCollectionRef)
          .then((semestersSnapshot) => {

            // 16 docs, correct
            console.log("semestersSnapshot: " + semestersSnapshot);
            console.log(semestersSnapshot);

            // in database: Y1S1, Y1S2, Y1ST1, Y1ST2, ..., Y4ST2
            semestersSnapshot.forEach(async semester => {
                console.log("semester: " + semester.id);
                console.log(semester);

                //const moduleCollectionRef = await getDocs(collection(db, `users/${user.email}/modules/${semester}/`));
                // retrieves all the documents in modules (each semester)
                //const moduleSnapshot = await getDocs(collection(db, `users/${user.email}/modules/`))
                
            })
            
/*

            // for each user in users (users is a collection)
            qSnapshot.forEach(async user => {
              if (user.id == currentUserEmail) {
                const semesterSnapshot = await getDocs(collection(db, `users/${user.id}/modules`));
                // for each semester under the user
                semesterSnapshot.forEach(async semester => {
                    userSemesterCount++;
                    const moduleSnapshot = await getDocs(collection(db, `users/${user.id}/modules/${semester.id}`));
                    // for each module under the semester
                    moduleSnapshot.forEach(module => {
                        let newModule = {
                            "moduleName": module.data().moduleName,
                            "moduleCode": module.data().moduleCode,
                            "moduleMC": module.data().moduleMC
                        }
                        semesterModulesArray.push(newModule);
                        setModulesBySemester(modulesBySemester);
                        console.log("pushed to semester " + semester.id + ": " + newModule.moduleName);
                        console.log(semesterModulesArray);
                    });
                });
              }
            });
            */
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