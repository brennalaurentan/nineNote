// styles

// components / pages / images

// tools
import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { deleteDoc, getDocs, doc, collection } from 'firebase/firestore';
import { auth, db } from '../others/firebase';
import { getAuth } from 'firebase/auth';

const ModulePillMenu = ({ moduleID, moduleCode, yearSem, onMenuClick }) => {
    const [menu, setMenu] = useState(null);
    const open = Boolean(menu);
    const handleClick = (event) => {
        setMenu(event.currentTarget);
    };
    const handleClose = () => {
        setMenu(null);
    };
    const handleDelete = async () => {
        onMenuClick(moduleID, moduleCode, yearSem);
        setMenu(null);

        try {
            const auth = getAuth();
            const user = auth.currentUser;
            const currentUserEmail = user.email;
            console.log("current user email is: " + currentUserEmail);
            //setCurrentUserEmail(user.email);
            let totalNumModules = 0;
      
            // can be removed: no need to check if module is already taken
            /*
            async function moduleAlreadyTaken() {
              let returnBool = false;
              const userModulesCollectionPath = `users/${currentUserEmail}/modules`;
              const userModulesCollection = collection(db, userModulesCollectionPath);
              const userModulesQuerySnapshot = await getDocs(userModulesCollection);
              userModulesQuerySnapshot.forEach((semDoc) => {
                if (module.id === "allModules") {
                  totalNumModules = semDoc.data().numModules;
                }
              })
              const userAllModulesCollectionPath = "users/" + currentUserEmail + "/modules/allModules/allModules"
              const userAllModulesCollection = collection(db, userAllModulesCollectionPath);
              const userAllModulesQuerySnapshot = await getDocs(userAllModulesCollection);
              userAllModulesQuerySnapshot.forEach((moduleDoc) => {
                // module found in user's 'allModules' collection with the same module code, 
                // means they've taken the module before
                if (moduleDoc.data().moduleCode === moduleCode) {
                  returnBool = true;
                }
              })
              // no module found in user's 'allModules' collection with the same module code,
              // means they haven't taken the module before
              return returnBool;
            }
            //setModuleAlreadyTaken(await moduleAlreadyTaken());
            */

            // delete module from 'modules' collection under user's profile database
            async function removeModuleFromAllModules(moduleCodeArg) {
                const userModulesCollectionPath = `users/${currentUserEmail}/modules`;
                const userModulesCollection = collection(db, userModulesCollectionPath);
                const userModulesQuerySnapshot = await getDocs(userModulesCollection);
                userModulesQuerySnapshot.forEach((semDoc) => {
                  if (semDoc.id === moduleCodeArg) {
                    deleteDoc(doc(db, userModulesCollectionPath, moduleCodeArg));
                  }
                })
            }
            removeModuleFromAllModules(moduleCode);
      
            /*
            //if (await moduleAlreadyTaken() === false) {
      
              // retrieve number of modules taken for the semester
              const userModulesBySemesterSnapshot = await getDocs(collection(db, `users/${currentUserEmail}/modules/`));
              let docCount = 0;
              userModulesBySemesterSnapshot.forEach((semesterDoc) => {
                if (semesterDoc.id === yearSemCode) {
                  docCount = semesterDoc.data().numModules;
                }
              })
        
            //   // obtain index of next module to add (to name the collection e.g module_1, module_2 etc)
            //   const docNextIndex = docCount + 1;
        
            //   // create new collection in semester with new module details
            //   await setDoc(doc(db, `users/${currentUserEmail}/modules/${yearSemCode}/module_${docNextIndex}`, 'moduleDetails'), {
            //     moduleID: v4(),
            //     moduleCode: moduleCode,
            //     moduleName: moduleName,
            //     moduleMC: moduleMC,
            //     moduleCategory: moduleCategory
            //   });
      
              // update numModules property (field) in firestore
              await setDoc(doc(db, `users/${currentUserEmail}/modules`, yearSemCode), {
                numModules: docNextIndex
              });
        
              // create new document in 'allModules' with new module details
              await setDoc(doc(db, `users/${currentUserEmail}/modules/allModules/allModules`, moduleCode), {
                moduleID: v4(),
                moduleCode: moduleCode,
                moduleName: moduleName,
                moduleMC: moduleMC,
                moduleCategory: moduleCategory
              })
        
              // retrieve necessary info pertaining to current progress of the added module's module group
              let moduleGroupCreditsCompleted = 0;
              let moduleGroupCreditsToMeet = 0;
              let newModuleGroupCreditsCompleted = 0;
              async function retrieveUserModuleGroupProgress() {
                const userModuleCollectionPath = retrieveUserModuleCreditTrackerPath(currentUserEmail, moduleCategory);
                const userModuleCollectionPathSnapshot = await getDocs(collection(db, userModuleCollectionPath));
                userModuleCollectionPathSnapshot.forEach((moduleGroupInCollection) => {
                    if (moduleGroupInCollection.id === moduleCategory) {
                      moduleGroupCreditsCompleted = parseInt(moduleGroupInCollection.data().creditsCompleted);
                      moduleGroupCreditsToMeet = parseInt(moduleGroupInCollection.data().creditsToMeet);
                    }
                });
              }
              await retrieveUserModuleGroupProgress();
        
              newModuleGroupCreditsCompleted = parseInt(moduleGroupCreditsCompleted) + parseInt(moduleMC);
              console.log("original credits completed for " + moduleCategory + ": " + moduleGroupCreditsCompleted);
              console.log("new credits completed for " + moduleCategory + ": " + newModuleGroupCreditsCompleted);
              let countedModuleCreditsGainedForGroup = moduleMC;
      
              // if original group credits completed already met or exceeded the credits to meet
              if (moduleGroupCreditsCompleted >= moduleGroupCreditsToMeet) {
                countedModuleCreditsGainedForGroup = 0;
              }
              // else if the objective was only just met and exceeded
              else if (newModuleGroupCreditsCompleted > moduleGroupCreditsToMeet) {
                // set the 'counted credits' counter to only as many that add up to the creditsToMeet
                countedModuleCreditsGainedForGroup = moduleGroupCreditsToMeet - moduleGroupCreditsCompleted;
              }
              console.log("counted credits gained towards overall: " + countedModuleCreditsGainedForGroup);
      
              // update the fields in the document for the module subgroup
              const userModuleCollectionPath = retrieveUserModuleCreditTrackerPath(currentUserEmail, moduleCategory);
              console.log("[update fields in document for module subgroup] moduleCategory is " + moduleCategory + ", path is " + userModuleCollectionPath);
              await updateDoc(doc(db, userModuleCollectionPath, moduleCategory), {
                creditsCompleted: newModuleGroupCreditsCompleted,
                creditsToMeet: moduleGroupCreditsToMeet
              })
      
              // special check for 4k module, if it's a focus area module
              const moduleCodeNumbers = moduleCode.slice(-4);
              if (moduleCategory.includes("primaries")) {
                if (parseInt(moduleCodeNumbers) >= 4000) {
                  // update the fourKModTaken field in the focusArea subgroup
                  updateDoc(doc(db, userModuleCollectionPath, moduleCategory), {
                    fourKModTaken: true
                  })
                }
              }
      
              // specially for focusArea, update the creditsCompleted field in the focusAreas document
              let focusAreasCreditsCompleted = 0;
              let newFocusAreaCreditsCompleted = 0;
              let countedFocusAreasCreditsGained = 0;
              let focusAreasCreditsToMeet = 0;
              if (userModuleCollectionPath.includes("focusAreas")) {
                async function updateFocusAreaCredits() {
                  const focusAreaCollectionPath = `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`; 
                  const focusAreaCollection = collection(db, focusAreaCollectionPath);
                  const focusAreaQuerySnapshot = await getDocs(focusAreaCollection);
                  // run through focusArea subdocument, then industryExperience subdocument
                  focusAreaQuerySnapshot.forEach((doc) => {
                    if (doc.id === "focusAreas") {
                      focusAreasCreditsCompleted = parseInt(doc.data().creditsCompleted);
                      focusAreasCreditsToMeet = parseInt(doc.data().creditsToMeet);
                    }
                  })
                  console.log("focusAreas creditsCompleted: " + focusAreasCreditsCompleted);
                  newFocusAreaCreditsCompleted = parseInt(focusAreasCreditsCompleted) + parseInt(moduleMC);
                  console.log("new focusArea credits completed: " + newFocusAreaCreditsCompleted);
                  await updateDoc(doc(db, focusAreaCollectionPath, "focusAreas"), {
                    creditsCompleted: parseInt(newFocusAreaCreditsCompleted)
                  })
                  if (focusAreasCreditsCompleted < focusAreasCreditsToMeet) {
                    if (newFocusAreaCreditsCompleted <= focusAreasCreditsToMeet) {
                      // count full
                      countedFocusAreasCreditsGained = newFocusAreaCreditsCompleted - focusAreasCreditsCompleted;
                    }
                    else {
                      // count partial, up to creditsToMeet
                      countedFocusAreasCreditsGained = focusAreasCreditsToMeet - focusAreasCreditsCompleted;
                    }
                  }
                  else {
                    // count none
                    countedFocusAreasCreditsGained = 0;
                  }
                  console.log("countedFocusAreasCreditsGained is " + countedFocusAreasCreditsGained);
                }
                updateFocusAreaCredits();
              }
      
              // update the fields in the main module group 
              // (creditsCompleted field in main commonCurriculum/programme/unrestrictedElectives documents)
              async function updateMainModuleGroupCredits() {
                const gradProgressCollectionPath = `users/${currentUserEmail}/gradProgress`;
                const gradProgressCollection = collection(db, gradProgressCollectionPath);
                const gradProgressQuerySnapshot = await getDocs(gradProgressCollection);
                let mainModuleGroupName = "";
                if (userModuleCollectionPath.includes("commonCurriculum")) {
                  mainModuleGroupName = "commonCurriculum";
                } else if (userModuleCollectionPath.includes("programme")) {
                  mainModuleGroupName = "programme";
                } else {
                  mainModuleGroupName = "unrestrictedElectives";
                }
                gradProgressQuerySnapshot.forEach((mainModuleGroup) => {
                  if (mainModuleGroup.id === mainModuleGroupName) {
                    console.log("main module group is " + mainModuleGroupName);
                    console.log("updating main module credits, current credits completed = " + mainModuleGroup.data().creditsCompleted);
                    console.log("new credits completed = " + countedModuleCreditsGainedForGroup);
                    if (userModuleCollectionPath.includes("focusAreas")) {
                      countedModuleCreditsGainedForGroup = countedFocusAreasCreditsGained;
                    }
                    updateDoc(doc(db, gradProgressCollectionPath, mainModuleGroupName), {
                      creditsCompleted: parseInt(mainModuleGroup.data().creditsCompleted) + parseInt(countedModuleCreditsGainedForGroup)
                    })
                    console.log("updated main module credits");
                  }
                })
              }
              await updateMainModuleGroupCredits();
        
              // if an objective was met by adding this module (module group objective met)
              if ((moduleGroupCreditsCompleted < moduleGroupCreditsToMeet) && (newModuleGroupCreditsCompleted >= moduleGroupCreditsToMeet)) {
                console.log(moduleCategory + " objective met!");
                // update the fields in the main group
                if (userModuleCollectionPath.includes("commonCurriculum")) {
                  if (userModuleCollectionPath.includes("universityLevel")) {
                    console.log("creditsCompleted: " + newModuleGroupCreditsCompleted);
                    // update the fulfilment in the subgroup itself as well
                    await updateDoc(doc(db, userModuleCollectionPath, moduleCategory), {
                      creditsCompleted: newModuleGroupCreditsCompleted,
                      creditsToMeet: moduleGroupCreditsToMeet,
                      uLSubgroup_fulfilment: true
                    })
      
                    // check other universityLevel subgroups to see if it's the last one
                    async function checkUniversityLevelFulfilment() {
                      let returnBool = true;
                      const collectionPath = retrieveUserModuleCreditTrackerPath(currentUserEmail, "communitiesAndEngagement");
                      const collectionRef = collection(db, collectionPath);
                      const querySnapshot = await getDocs(collectionRef);
                      querySnapshot.forEach((uLSubgroup) => {
                        if (uLSubgroup.data().uLSubgroup_fulfilment === false) {
                          returnBool = false;
                        }
                      });
                      return returnBool;
                    }
                    // if all universityLevel subgroups have been satisfied
                    if (await checkUniversityLevelFulfilment() === true) {
                      // set universityLevel_fulfilment to true
                      updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "commonCurriculum"), {
                        universityLevel_fulfilment: true
                      })
                    }
                  }
                  // if not universityLevel (computingEthics, crossDisciplinaryEducation, interdisciplinaryEducation)
                  else {
                    // set computingEthics_fulfilment / crossDisciplinaryEducation_fulfilment / interdisciplinaryEducation_fulfilment to true
                    if (moduleCategory === "computingEthics") {
                      updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "commonCurriculum"), {
                        computingEthics_fulfilment: true
                      })
                    }
                    else if (moduleCategory === "crossDisciplinaryEducation") {
                      updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "commonCurriculum"), {
                        crossdisciplinaryEducation_fulfilment: true
                      })
                    }
                    else {
                      updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "commonCurriculum"), {
                        interdisciplinaryEducation_fulfilment: true
                      })
                    }
                  }
                  await checkAndSetCommonCurriculumOverallFulfilment();
                // for programme requirement modules
                } else if (userModuleCollectionPath.includes("programme")) {
                  // is a focusArea, meaning a focusArea was cleared
                  if (userModuleCollectionPath.includes("focusAreas")) {
                    // check that the 4k mod requirement has been met as well
                    async function checkFocusArea4kFulfilment() {
                      let returnBool = false;
                      const focusAreaCollectionPath = retrieveUserModuleCreditTrackerPath(currentUserEmail, moduleCategory);
                      const focusAreaCollection = collection(db, focusAreaCollectionPath);
                      const focusAreaQuerySnapshot = await getDocs(focusAreaCollection);
                      focusAreaQuerySnapshot.forEach((focusAreaSubgroup) => {
                        if (focusAreaSubgroup.id === moduleCategory) {
                          returnBool = focusAreaSubgroup.data().fourKModTaken;
                        }
                      });
                      return returnBool;
                    }
                    let focusArea4kFulfilment = await checkFocusArea4kFulfilment(moduleCategory);
      
                    // if 4k module requirement met
                    if (focusArea4kFulfilment) {
                      // update the fulfilment in the focusArea subgroup (oneFocusAreaCompleted field)
                      await updateDoc(doc(db, `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`, "focusAreas"), {
                        oneFocusAreaCompleted: true,
                      })
      
                      // check creditsCompleted for focusAreas
                      async function checkFocusAreasCreditsCompleted() {
                        let returnInt = 0;
                        const focusAreasCollectionPath = `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`;
                        const focusAreasCollection = collection(db, focusAreasCollectionPath);
                        const focusAreasQuerySnapshot = await getDocs(focusAreasCollection);
                        focusAreasQuerySnapshot.forEach((subDoc) => {
                          if (subDoc.id === "focusAreas") {
                            returnInt = parseInt(subDoc.data().creditsCompleted);
                          }
                        });
                        return returnInt;
                      }
      
                      // if 20MC focusArea credit requirement met
                      if (await checkFocusAreasCreditsCompleted() >= 20) {
                        // update the fulfilment in the focusArea subgroup (focusArea_fulfilment field)
                        await updateDoc(doc(db, `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`, "focusAreas"), {
                          focusAreas_fulfilment: true,
                        })
                      }
      
                      // check other breadthAndDepth subgroups to see if it's the last one
                      let industryExperienceFulfilment = false;
                      async function checkIndustryExperienceFulfilment() {
                        let returnBool = false;
                        const breadthAndDepthCollectionPath = `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`;
                        const breadthAndDepthCollection = collection(db, breadthAndDepthCollectionPath);
                        const breadthAndDepthQuerySnapshot = await getDocs(breadthAndDepthCollection);
                        breadthAndDepthQuerySnapshot.forEach((breadthAndDepthSubgroup) => {
                          if (breadthAndDepthSubgroup.id === "industryExperience") {
                            returnBool = breadthAndDepthSubgroup.data().industryExperience_fulfilment;
                          }
                        })
                        return returnBool;
                      }
                      industryExperienceFulfilment = checkIndustryExperienceFulfilment();
      
                      async function checkBreadthAndDepthCredits() {
                        let returnInt = 0;
                        let focusAreasCreditsCompleted = 0;
                        let industryExperienceCreditsCompleted = 0;
                        let countedFocusAreasCredits = 0;
                        let countedIndustryExperienceCredits = 0;
                        const breadthAndDepthCollectionPath = `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`;
                        const breadthAndDepthCollection = collection(db, breadthAndDepthCollectionPath);
                        const breadthAndDepthQuerySnapshot = await getDocs(breadthAndDepthCollection);
                        breadthAndDepthQuerySnapshot.forEach((breadthAndDepthSubgroup) => {
                          // focusAreas document
                          if (breadthAndDepthSubgroup.id === "focusAreas") {
                            focusAreasCreditsCompleted = parseInt(breadthAndDepthSubgroup.data().creditsCompleted);
                            countedFocusAreasCredits = focusAreasCreditsCompleted;
                            if (focusAreasCreditsCompleted > 20) {
                              countedFocusAreasCredits = 20;
                            }
                          }
                          // industryExperience document
                          else {
                            industryExperienceCreditsCompleted = parseInt(breadthAndDepthSubgroup.data().creditsCompleted);
                            countedIndustryExperienceCredits = industryExperienceCreditsCompleted;
                            if (industryExperienceCreditsCompleted > 12) {
                              countedIndustryExperienceCredits = 12;
                            }
                          }
                        })
                        returnInt = countedFocusAreasCredits + countedIndustryExperienceCredits;
                        return returnInt;
                      }
                      
                      // all breadthAndDepth requirements fulfilled
                      if (industryExperienceFulfilment && await checkBreadthAndDepthCredits() >= 32) {
                        // set breadthAndDepth_fulfilment to true
                        updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "programme"), {
                          breadthAndDepth_fulfilment: true
                        });
                      }
                    }
                    // else, focus are 4k module requirement not met
                    else {
                      console.log("focus area 4k module requirement not met");
                    }
                  }
                  // industryExperience
                  else if (moduleCategory.includes("industryExperience")) {
                    console.log("updating industryExperience_fulfilment to true");
                    // update the fulfilment in the industryExperience subgroup (industryExperience_fulfilment field)
                    await updateDoc(doc(db, `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`, "industryExperience"), {
                      industryExperience_fulfilment: true
                    })
      
                    // check other breadthAndDepth subgroups to see if it's the last one
                    let focusAreaFulfilment = false;
                    async function checkFocusAreaFulfilment() {
                      let returnBool = false;
                      const breadthAndDepthCollectionPath = `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`;
                      const breadthAndDepthCollection = collection(db, breadthAndDepthCollectionPath);
                      const breadthAndDepthQuerySnapshot = await getDocs(breadthAndDepthCollection);
                      breadthAndDepthQuerySnapshot.forEach((breadthAndDepthSubgroup) => {
                        if (breadthAndDepthSubgroup.id === "focusAreas") {
                          returnBool = breadthAndDepthSubgroup.data().focusAreas_fulfilment;
                        }
                      })
                      return returnBool;
                    }
                    focusAreaFulfilment = checkFocusAreaFulfilment();
      
                    // function which calculates total number of credits completed for breadthAndDepth subgroup
                    // by adding up the credits from focusAreas and industryExperience sub-subgroups
                    // updates the 'creditsCompleted' field in the breadthAndDepth document, under programme main group
                    async function checkBreadthAndDepthCredits() {
                      let returnInt = 0;
                      let focusAreasCreditsCompleted = 0;
                      let countedFocusAreasCreditsCompleted = 0;
                      let industryExperienceCreditsCompleted = 0;
                      let countedIndustryExperienceCreditsCompleted = 0;
                      const breadthAndDepthCollectionPath = `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`;
                      const breadthAndDepthCollection = collection(db, breadthAndDepthCollectionPath);
                      const breadthAndDepthQuerySnapshot = await getDocs(breadthAndDepthCollection);
                      breadthAndDepthQuerySnapshot.forEach((breadthAndDepthSubgroup) => {
                        // focusAreas document
                        if (breadthAndDepthSubgroup.id === "focusAreas") {
                          focusAreasCreditsCompleted = parseInt(breadthAndDepthSubgroup.data().creditsCompleted);
                          countedFocusAreasCreditsCompleted = focusAreasCreditsCompleted;
                          if (countedFocusAreasCreditsCompleted > 20) {
                            countedFocusAreasCreditsCompleted = 20;
                          }
                        }
                        // industryExperience document
                        else {
                          industryExperienceCreditsCompleted = parseInt(breadthAndDepthSubgroup.data().creditsCompleted);
                          countedFocusAreasCreditsCompleted = industryExperienceCreditsCompleted;
                          if (countedIndustryExperienceCreditsCompleted > 12) {
                            countedIndustryExperienceCreditsCompleted = 12;
                          }
                        }
                      })
                      returnInt = parseInt(countedFocusAreasCreditsCompleted) + parseInt(countedIndustryExperienceCreditsCompleted);
                      return returnInt;
                    }
                    
                    // all breadthAndDepth requirements fulfilled
                    if (focusAreaFulfilment && await checkBreadthAndDepthCredits() >= 32) {
                      // set breadthAndDepth_fulfilment to true
                      updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "programme"), {
                        breadthAndDepth_fulfilment: true
                      });
                    }
                  }
                  // mathematicsAndSciences or foundation
                  else {
                    // mathematicsAndSciences
                    if (moduleCategory === "mathematicsAndSciences") {
                      updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "programme"), {
                        mathematicsAndSciences_fulfilment: true
                      })
                    }
                    // foundation
                    else {
                      updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "programme"), {
                        foundation_fulfilment: true
                      })
                    }
                  }
                  await checkAndSetProgrammeOverallFulfilment();
                // for unrestrictedElective requirement modules
                } else {
                  await checkAndSetUnrestrictedElectivesOverallFulfilment();
                }
              }
        
              // update progress rings and progress bar
              //GraduationProgressTracker();      
            //}
            // module taken before (moduleAlreadyTaken flag is set to true)
            //else {
            //  console.log("module already taken!");
            //}
            */
          } catch (error) {
            console.log(error.message);
          }
    };

    return (
        <>
            <IconButton aria-label="delete" size="small" onClick={handleClick}>
                <KeyboardArrowDownIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={menu}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleDelete} sx={{ color: "red.main" }}>Delete</MenuItem>
            </Menu>
        </>
    )
}

export default ModulePillMenu