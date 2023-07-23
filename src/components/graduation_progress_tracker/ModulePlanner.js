// styles

// components / pages / images
import ModulePill from './ModulePill';
import ButtonDialog from './ButtonDialog';
import CreditCount from './CreditCount';
import ThingsToNote from './ThingsToNote';

// tools
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Box, Container } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from "lodash";
import { v4 } from 'uuid';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../others/firebase';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const SemContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap"
}));

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

const ModulePlanner = ({ retrieveProgressFields }) => {

  // handles currently signed-in user
  const [user, setUser] = useState({});

  // function to get the currently signed-in user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
  }, [])

  const [modulesBySemester, setModulesBySemester] = useState({});

  useEffect(() => {
    async function loadSemesterModules() {
      console.log("loadSemesterModules() called");
      const allModulesCollectionRef = collection(db, `users/${user.email}/modules`);
      const allModulesSnapshot = await getDocs(allModulesCollectionRef);

      try {
        let y1s1Mods = [];
        let y1s1ModsCreditCount = 0;
        let y1s2Mods = [];
        let y1s2ModsCreditCount = 0;
        let y1st1Mods = [];
        let y1st1ModsCreditCount = 0;
        let y1st2Mods = [];
        let y1st2ModsCreditCount = 0;
        let y2s1Mods = [];
        let y2s1ModsCreditCount = 0;
        let y2s2Mods = [];
        let y2s2ModsCreditCount = 0;
        let y2st1Mods = [];
        let y2st1ModsCreditCount = 0;
        let y2st2Mods = [];
        let y2st2ModsCreditCount = 0;
        let y3s1Mods = [];
        let y3s1ModsCreditCount = 0;
        let y3s2Mods = [];
        let y3s2ModsCreditCount = 0;
        let y3st1Mods = [];
        let y3st1ModsCreditCount = 0;
        let y3st2Mods = [];
        let y3st2ModsCreditCount = 0;
        let y4s1Mods = [];
        let y4s1ModsCreditCount = 0;
        let y4s2Mods = [];
        let y4s2ModsCreditCount = 0;
        let y4st1Mods = [];
        let y4st1ModsCreditCount = 0;
        let y4st2Mods = [];
        let y4st2ModsCreditCount = 0;

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
              y1s1ModsCreditCount = parseInt(module.data().moduleMC) + y1s1ModsCreditCount;
              break;
            case "Y1S2":
              y1s2Mods.push(newItem);
              y1s2ModsCreditCount = parseInt(module.data().moduleMC) + y1s2ModsCreditCount;
              break;
            case "Y1ST1":
              y1st1Mods.push(newItem);
              y1st1ModsCreditCount = parseInt(module.data().moduleMC) + y1st1ModsCreditCount;
              break;
            case "Y1ST2":
              y1st2Mods.push(newItem);
              y1st2ModsCreditCount = parseInt(module.data().moduleMC) + y1st2ModsCreditCount;
              break;
            case "Y2S1":
              y2s1Mods.push(newItem);
              y2s1ModsCreditCount = parseInt(module.data().moduleMC) + y2s1ModsCreditCount;
              break;
            case "Y2S2":
              y2s2Mods.push(newItem);
              y2s2ModsCreditCount = parseInt(module.data().moduleMC) + y2s2ModsCreditCount;
              break;
            case "Y2ST1":
              y2st1Mods.push(newItem);
              y2st1ModsCreditCount = parseInt(module.data().moduleMC) + y2st1ModsCreditCount;
              break;
            case "Y2ST2":
              y2st2Mods.push(newItem);
              y2st2ModsCreditCount = parseInt(module.data().moduleMC) + y2st2ModsCreditCount;
              break;
            case "Y3S1":
              y3s1Mods.push(newItem);
              y3s1ModsCreditCount = parseInt(module.data().moduleMC) + y3s1ModsCreditCount;
              break;
            case "Y3S2":
              y3s2Mods.push(newItem);
              y3s2ModsCreditCount = parseInt(module.data().moduleMC) + y3s2ModsCreditCount;
              break;
            case "Y3ST1":
              y3st1Mods.push(newItem);
              y3st1ModsCreditCount = parseInt(module.data().moduleMC) + y3st1ModsCreditCount;
              break;
            case "Y3ST2":
              y3st2Mods.push(newItem);
              y3st2ModsCreditCount = parseInt(module.data().moduleMC) + y3st2ModsCreditCount;
              break;
            case "Y4S1":
              y4s1Mods.push(newItem);
              y4s1ModsCreditCount = parseInt(module.data().moduleMC) + y4s1ModsCreditCount;
              break;
            case "Y4S2":
              y4s2Mods.push(newItem);
              y4s2ModsCreditCount = parseInt(module.data().moduleMC) + y4s2ModsCreditCount;
              break;
            case "Y4ST1":
              y4st1Mods.push(newItem);
              y4st1ModsCreditCount = parseInt(module.data().moduleMC) + y4st1ModsCreditCount;
              break;
            case "Y4ST2":
              y4st2Mods.push(newItem);
              y4st2ModsCreditCount = parseInt(module.data().moduleMC) + y4st2ModsCreditCount;
              break;
            default:
          }
        })

        let newState = {
          "Y1 S1": { title: "Y1 S1", items: y1s1Mods, credits: y1s1ModsCreditCount },
          "Y1 S2": { title: "Y1 S2", items: y1s2Mods, credits: y1s2ModsCreditCount },
          "Y1 ST1": { title: "Y1 ST1", items: y1st1Mods, credits: y1st1ModsCreditCount },
          "Y1 ST2": { title: "Y1 ST2", items: y1st2Mods, credits: y1st2ModsCreditCount },
          "Y2 S1": { title: "Y2 S1", items: y2s1Mods, credits: y2s1ModsCreditCount },
          "Y2 S2": { title: "Y2 S2", items: y2s2Mods, credits: y2s2ModsCreditCount },
          "Y2 ST1": { title: "Y2 ST1", items: y2st1Mods, credits: y2st1ModsCreditCount },
          "Y2 ST2": { title: "Y2 ST2", items: y2st2Mods, credits: y2st2ModsCreditCount },
          "Y3 S1": { title: "Y3 S1", items: y3s1Mods, credits: y3s1ModsCreditCount },
          "Y3 S2": { title: "Y3 S2", items: y3s2Mods, credits: y3s2ModsCreditCount },
          "Y3 ST1": { title: "Y3 ST1", items: y3st1Mods, credits: y3st1ModsCreditCount },
          "Y3 ST2": { title: "Y3 ST2", items: y3st2Mods, credits: y3st2ModsCreditCount },
          "Y4 S1": { title: "Y4 S1", items: y4s1Mods, credits: y4s1ModsCreditCount },
          "Y4 S2": { title: "Y4 S2", items: y4s2Mods, credits: y4s2ModsCreditCount },
          "Y4 ST1": { title: "Y4 ST1", items: y4st1Mods, credits: y4st1ModsCreditCount },
          "Y4 ST2": { title: "Y4 ST2", items: y4st2Mods, credits: y4st2ModsCreditCount }
        };
        setModulesBySemester(newState);

      } catch (error) {
        console.log(error.message);
      }
    }
    loadSemesterModules();
  }, [user]);

  const handleDragEnd = ({ destination, source }) => {

    console.log("from", source)
    console.log("to", destination)

    const originalYearSem = destination.droppableId.replace(/ /g, '');
    const newYearSem = destination.droppableId.replace(/ /g, '');
    const moduleCode = modulesBySemester[source.droppableId].items[source.index].moduleCode;
    const moduleMC = modulesBySemester[source.droppableId].items[source.index].moduleMC;

    const userModuleCollectionPath = `users/${user.email}/modules`;
    updateDoc(doc(db, userModuleCollectionPath, moduleCode), {
      yearSem: newYearSem
    })
    console.log(moduleCode + " moved from " + originalYearSem + " to " + newYearSem);

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
      modulesBySemester[source.droppableId].credits -= parseInt(moduleMC)
      modulesBySemester[destination.droppableId].credits += parseInt(moduleMC)
      return prev
    })
  }

  const addModule = (moduleCode, moduleName, moduleMC, moduleCategory, yearSem) => {
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
              moduleCategory: moduleCategory,
            },
            ...prev[yearSem].items
          ],
          credits: prev[yearSem].credits + parseInt(moduleMC),
        }
      };
    })
    retrieveProgressFields();
  }

  const deleteModule = (moduleID, moduleCode, moduleMC, yearSem) => {
    console.log("Module Deleted: " + moduleCode);
    console.log("Year and Semester: " + yearSem);
    setModulesBySemester(prev => {
      return {
        ...prev,
        [yearSem]: {
          title: yearSem,
          items: [
            ...prev[yearSem].items.filter(module => module.moduleID !== moduleID)
          ],
          credits: prev[yearSem].credits - parseInt(moduleMC),
        }
      }
    })
    retrieveProgressFields();
  }

  return (
      <Stack gap="32px" width="100vw">
          <Stack direction="row" display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h3">Module Planner</Typography>
              <ThingsToNote />
          </Stack>
          <DragDropContext onDragEnd={handleDragEnd}>
              {_.map(modulesBySemester, (data, key) => {
                  return (
                      <>
                          <Typography variant="body_bold">{data.title}</Typography>
                          <Box bgcolor="light_blue.light" padding="30px" borderRadius="30px" display="flex" flexDirection="column" gap="30px">
                              <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center" marginTop="5px">
                                  <CreditCount value={data.credits} />
                                  <ButtonDialog
                                      modLibrary="planner"
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
                                                                          moduleCategory={el.moduleCategory}
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