// styles

// components / pages / images
import ModulePill from './ModulePill';
import ButtonDialog from './ButtonDialog';

// tools
import React, { useState, useEffect } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from "lodash";
import { v4 } from 'uuid';
import { auth, db } from '../others/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import CreditCount from './CreditCount';

const item1 = {
    id: v4(),
    code: "MA1301",
    name: "Introductory Mathematics",
    mc: 4
}

const ModuleExemptions = ({ retrieveProgressFields }) => {

  // handles currently signed-in user
  const [user, setUser] = useState({});

  // function to get the currently signed-in user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [])

  const [moduleExemptions, setModuleExemptions] = useState({});
  const [moduleExemptionsCreditCount, setModuleExemptionsCreditCount] = useState(0);

  useEffect(() => {
    async function loadModuleExemptions() {
      const allModulesCollectionRef = collection(db, `users/${user.email}/modules`);
      const allModulesSnapshot = await getDocs(allModulesCollectionRef);

      try {
        let exemptionMods = [];
        let exemptionModsCreditCount = 0;
        allModulesSnapshot.forEach(module => {
            if (module.data().yearSem === "Exemptions") {
                const newItem = {
                    moduleID: module.data().moduleID,
                    moduleCode: module.data().moduleCode,
                    moduleName: module.data().moduleName,
                    moduleMC: module.data().moduleMC,
                    moduleCategory: module.data().moduleCategory
                }

                exemptionMods.push(newItem);
                exemptionModsCreditCount = parseInt(module.data().moduleMC) + exemptionModsCreditCount;
            }
        })

        let newState = {
            "Exemptions": { title: "", items: exemptionMods },
        };

        setModuleExemptions(newState);
        setModuleExemptionsCreditCount(exemptionModsCreditCount);

        console.log("new state: ", newState);

      } catch (error) {
        console.log(error.message);
      }
    }
    loadModuleExemptions();
  }, [user]);

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
    const itemCopy = { ...moduleExemptions[source.droppableId].items[source.index] };
    setModuleExemptions(prev => {
      prev = { ...prev }
      // remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)
      // adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
      return prev
    })
  }

  const addModule = (moduleCode, moduleName, moduleMC, moduleCategory, yearSem) => {
    console.log("Module Added: " + moduleCode);
    console.log("Year and Semester: " + yearSem);
    setModuleExemptions(prev => {
      return {
        ...prev,
        [yearSem]: {
          title: "",
          items: [
            {
              moduleID: v4(),
              moduleCode: moduleCode,
              moduleName: moduleName,
              moduleMC: moduleMC,
              moduleCategory: moduleCategory,
            },
            ...prev[yearSem].items
          ]
        }
      }
    })
    setModuleExemptionsCreditCount(prev => prev + parseInt(moduleMC));
    retrieveProgressFields();
  }

  const deleteModule = (moduleID, moduleCode, moduleMC, yearSem) => {
    console.log("Module Deleted: " + moduleCode);
    console.log("Year and Semester: " + yearSem);
    setModuleExemptions(prev => {
      return {
        ...prev,
        [yearSem]: {
          title: "",
          items: [
            ...prev[yearSem].items.filter(module => module.moduleID !== moduleID)
          ]
        }
      }
    })
    setModuleExemptionsCreditCount(prev => prev - parseInt(moduleMC));
    retrieveProgressFields();
  }

  return (
    <Stack gap="32px">
      <Typography variant="h3">Module Exemptions</Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(moduleExemptions, (data, key) => {
          return (
            <>
              <Box
                bgcolor="light_blue.light"
                padding="30px"
                borderRadius="30px"
                display="flex"
                flexDirection="column"
                gap="30px"
              >
                <Stack
                  direction="row"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop="5px"
                >
                  <CreditCount value={moduleExemptionsCreditCount} />
                  <ButtonDialog
                    modLibrary="exemptions"
                    button_text="+ ADD NEW"
                    header="Add Module Exemptions"
                    text="Search for your exempted modules by their respective module code 
                                    and add them to your module exemptions!"
                    onSubmit={addModule}
                    yearSem="Exemptions"
                  />
                </Stack>
                <Droppable droppableId={key}>
                  {(provided) => {
                    return (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.moduleID}
                              index={index}
                              draggableId={el.moduleID}
                            >
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
                                      moduleCategory={el.moduleCategory}
                                      yearSem="Exemptions"
                                      onClick={deleteModule}
                                    />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </Box>
            </>
          );
        })}
      </DragDropContext>
    </Stack>
  );
}

export default ModuleExemptions