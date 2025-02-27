// styles

// components / pages / images

// tools
import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { Menu, MenuItem, IconButton, Snackbar, Alert, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { auth, db } from '../others/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, setDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

const userCreditTrackerPathArray = [
  {
    groupName: "computingEthics",
    collectionPath: '/users/!/gradProgress/commonCurriculum/computingEthics'
  },
  {
    groupName: "crossdisciplinaryEducation",
    collectionPath: '/users/!/gradProgress/commonCurriculum/crossdisciplinaryEducation'
  },
  {
    groupName: "interdisciplinaryEducation",
    collectionPath: '/users/!/gradProgress/commonCurriculum/interdisciplinaryEducation'
  },
  {
    groupName: "communitiesAndEngagement",
    collectionPath: '/users/!/gradProgress/commonCurriculum/universityLevel'
  },
  {
    groupName: "critiqueAndExpression",
    collectionPath: '/users/!/gradProgress/commonCurriculum/universityLevel'
  },
  {
    groupName: "culturesAndConnections",
    collectionPath: '/users/!/gradProgress/commonCurriculum/universityLevel'
  },
  {
    groupName: "dataLiteracy",
    collectionPath: '/users/!/gradProgress/commonCurriculum/universityLevel'
  },
  {
    groupName: "digitalLiteracy",
    collectionPath: '/users/!/gradProgress/commonCurriculum/universityLevel'
  },
  {
    groupName: "singaporeStudies",
    collectionPath: '/users/!/gradProgress/commonCurriculum/universityLevel'
  },
  {
    groupName: "algorithmsAndTheory_electives",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "algorithmsAndTheory_primaries",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "artificialIntelligence_electives",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "artificialIntelligence_primaries",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "computerGraphicsAndGames_electives",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "computerGraphicsAndGames_primaries",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "computerSecurity_electives",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "computerSecurity_primaries",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "databaseSystems_electives",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "databaseSystems_primaries",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "multimediaInformationRetrieval_electives",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "multimediaInformationRetrieval_primaries",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "networkingAndDistributedSystems_electives",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "networkingAndDistributedSystems_primaries",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "focusAreas_others",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "parallelComputing_electives",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "parallelComputing_primaries",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "programmingLanguages_electives",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "programmingLanguages_primaries",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "softwareEngineering_electives",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "softwareEngineering_primaries",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "industryExperience",
    collectionPath: '/users/!/gradProgress/programme/breadthAndDepth'
  },
  {
    groupName: "mathematicsAndSciences",
    collectionPath: '/users/!/gradProgress/programme/mathematicsAndSciences'
  },
  {
    groupName: "foundation",
    collectionPath: '/users/!/gradProgress/programme/foundation'
  },
  {
    groupName: "unrestrictedElectives",
    collectionPath: '/users/!/gradProgress'
  }
]

const RecommendedModulePillMenu = ({ moduleCode, moduleName, moduleMC, moduleCategory, yearSem }) => {
  // handles currently signed-in user
  const [user, setUser] = useState({});

  // function to get the currently signed-in user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [])

  // snackbar states
  const [openModuleAddedSuccessSnackBar, setOpenModuleAddedSuccessSnackBar] = useState(false);
  const [openModuleAddedErrorSnackBar, setOpenModuleAddedErrorSnackBar] = useState(false);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenModuleAddedSuccessSnackBar(false);
    setOpenModuleAddedErrorSnackBar(false);
  }

  // function to retrieve the path to the collection which stores the module group tracker for
  // a particular specified user
  // the path to the collection returned, contains fields called 'creditsCompleted' and 'creditsToMeet'
  function retrieveUserModuleCreditTrackerPath(userEmail, moduleGroupName) {
    let returnPath = "";
    userCreditTrackerPathArray.forEach((moduleGroup) => {
      if (moduleGroup.groupName === moduleGroupName) {
        returnPath = moduleGroup.collectionPath;
      }
    })
    returnPath = returnPath.replace(/!/g, userEmail);
    return returnPath;
  }

  // function which checks the commonCurriculum subgroup requirements
  // and changes the overall_fulfilment field accordingly
  // returns the boolean value of overall_fulfilment
  async function checkAndSetCommonCurriculumOverallFulfilment() {
    const querySnapshot = await getDocs(collection(db, `users/${user.email}/gradProgress`));
    querySnapshot.forEach((group) => {
      // groups are: commonCurriculum, programme, unrestrictedElectives. We want commonCurriculum
      if (group.id === "commonCurriculum") {
        if (group.data().computingEthics_fulfilment === true &&
          group.data().crossdisciplinaryEducation_fulfilment === true &&
          group.data().interdisciplinaryEducation_fulfilment === true &&
          group.data().universityLevel_fulfilment === true) {
          updateDoc(doc(db, `users/${user.email}/gradProgress`, "commonCurriculum"), {
            overall_fulfilment: true
          })
          console.log("Updated commonCurriculum overall fulfilment to true");
          return true;
        }
        else {
          updateDoc(doc(db, `users/${user.email}/gradProgress`, "commonCurriculum"), {
            overall_fulfilment: false
          })
          console.log("commonCurriculum overall fulfilment is false");
          return false;
        }
      }
    });
  }

  // function which checks the programme subgroup requirements
  // and changes the overall_fulfilment field accordingly
  // returns the boolean value of overall_fulfilment
  async function checkAndSetProgrammeOverallFulfilment() {
    const querySnapshot = await getDocs(collection(db, `users/${user.email}/gradProgress`));
    querySnapshot.forEach((group) => {
      // groups are: commonCurriculum, programme, unrestrictedElectives. We want programme
      if (group.id === "programme") {
        if (group.data().breadthAndDepth_fulfilment === true &&
          group.data().foundation_fulfilment === true &&
          group.data().mathematicsAndSciences_fulfilment === true) {
          updateDoc(doc(db, `users/${user.email}/gradProgress`, "programme"), {
            overall_fulfilment: true
          })
          console.log("Updated programme overall fulfilment to true");
          return true;
        }
        else {
          updateDoc(doc(db, `users/${user.email}/gradProgress`, "programme"), {
            overall_fulfilment: false
          })
          console.log("programme overall fulfilment is false");
          return false;
        }
      }
    })
  }

  // function which checks the unrestrictedElectives subgroup requirements
  // and changes the overall_fulfilment field accordingly
  // returns the boolean value of overall_fulfilment
  async function checkAndSetUnrestrictedElectivesOverallFulfilment() {
    const querySnapshot = await getDocs(collection(db, `users/${user.email}/gradProgress`));
    querySnapshot.forEach((group) => {
      // groups are: commonCurriculum, programme, unrestrictedElectives. We want unrestrictedElectives
      if (group.id === "unrestrictedElectives") {
        if (parseInt(group.data().creditsCompleted) >= parseInt(group.data().creditsToMeet)) {
          updateDoc(doc(db, `users/${user.email}/gradProgress`, "unrestrictedElectives"), {
            overall_fulfilment: true
          })
          console.log("Updated unrestrictedElectives overall fulfilment to true");
          return true;
        }
        else {
          updateDoc(doc(db, `users/${user.email}/gradProgress`, "unrestrictedElectives"), {
            overall_fulfilment: false
          })
          console.log("unrestrictedElectives overall fulfilment is false");
          return false;
        }
      }
    });
  }

  // handles display of recommended module pill menu
  const [menu, setMenu] = useState(null);
  const open = Boolean(menu);

  // function to open recommended module pill menu
  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };

  // function to close recommended module pill menu
  const handleClose = () => {
    setMenu(null);
  };

  // function to check if recommended module exists in user's account in firebase
  // if yes, recommended module pill menu closes and module is not added
  // if no, module document is created under user's account in firebase
  const handleAdd = async () => {
    try {
      console.log("current user email is: " + user.email);

      async function moduleAlreadyTaken() {
        console.log("moduleAlreadyTaken() called");
        let returnBool = false;
        const userAllModulesCollectionPath = "users/" + user.email + "/modules"
        const userAllModulesCollection = collection(db, userAllModulesCollectionPath);
        const userAllModulesQuerySnapshot = await getDocs(userAllModulesCollection);
        userAllModulesQuerySnapshot.forEach((moduleDoc) => {
          // module found in user's 'allModules' collection with the same module code, 
          // means they've taken the module before
          if (moduleDoc.data().moduleCode === moduleCode) {
            returnBool = true;
          }
        })
        console.log("moduleAlreadyTaken() success: moduleTaken is " + returnBool);
        // no module found in user's 'allModules' collection with the same module code,
        // means they haven't taken the module before
        return returnBool;
      }

      if (await moduleAlreadyTaken() === false) {
        const yearSemCode = yearSem.replace(/ /g, '');

        // create new document in 'modules' with new module details
        await setDoc(doc(db, `users/${user.email}/modules`, moduleCode), {
          moduleID: v4(),
          moduleCode: moduleCode,
          moduleName: moduleName,
          moduleMC: moduleMC,
          moduleCategory: moduleCategory,
          yearSem: yearSemCode
        })
        console.log("Module added to user's database");

        // retrieve necessary info pertaining to current progress of the added module's module group
        let moduleGroupCreditsCompleted = 0;
        let moduleGroupCreditsToMeet = 0;
        let newModuleGroupCreditsCompleted = 0;
        async function retrieveUserModuleGroupProgress() {
          const userModuleCollectionPath = retrieveUserModuleCreditTrackerPath(user.email, moduleCategory);
          const userModuleCollectionPathSnapshot = await getDocs(collection(db, userModuleCollectionPath));
          userModuleCollectionPathSnapshot.forEach((moduleGroupInCollection) => {
            if (moduleGroupInCollection.id === moduleCategory) {
              moduleGroupCreditsCompleted = parseInt(moduleGroupInCollection.data().creditsCompleted);
              console.log("Module group [" + moduleCategory + "] current credits completed = " + moduleGroupCreditsCompleted);
              newModuleGroupCreditsCompleted = parseInt(moduleGroupCreditsCompleted) + parseInt(moduleMC);
              console.log("Module group [" + moduleCategory + "] new credits completed = " + newModuleGroupCreditsCompleted);
              moduleGroupCreditsToMeet = parseInt(moduleGroupInCollection.data().creditsToMeet);
              console.log("Module group [" + moduleCategory + "] credits to meet = " + moduleGroupCreditsToMeet);
            }
          });
        }
        await retrieveUserModuleGroupProgress();
    
			// obtain path to collection containing data for the module group, pertaining to the user
			const userModuleCollectionPath = retrieveUserModuleCreditTrackerPath(user.email, moduleCategory);

			// update the fields in the document for the module subgroup (except for unrestrictedElectives)
			if (!moduleCategory.includes("unrestrictedElectives")) {
				console.log("[update fields in document for module subgroup] moduleCategory is " + moduleCategory + ", path is " + userModuleCollectionPath);
				await updateDoc(doc(db, userModuleCollectionPath, moduleCategory), {
					creditsCompleted: newModuleGroupCreditsCompleted,
				})
        console.log("Updated credit count in module group [" + moduleCategory + "]");
			}

        // specially for focusArea, update the creditsCompleted field in the focusAreas document
        let focusAreasCreditsCompleted = 0;
        let newFocusAreaCreditsCompleted = 0;
        let countedFocusAreasCreditsGained = 0;
        let focusAreasCreditsToMeet = 0;
        if (userModuleCollectionPath.includes("focusAreas")) {
          async function updateFocusAreaCredits() {
            console.log("updateFocusAreaCredits() called");
            const focusAreaCollectionPath = `users/${user.email}/gradProgress/programme/breadthAndDepth`;
            const focusAreaCollection = collection(db, focusAreaCollectionPath);
            const focusAreaQuerySnapshot = await getDocs(focusAreaCollection);
            focusAreaQuerySnapshot.forEach((doc) => {
              // run through focusArea subdocument
              if (doc.id === "focusAreas") {
                focusAreasCreditsCompleted = parseInt(doc.data().creditsCompleted);
                console.log("updateFocusAreaCredits(): focusAreas current credits completed = " + focusAreasCreditsCompleted);
                newFocusAreaCreditsCompleted = parseInt(focusAreasCreditsCompleted) + parseInt(moduleMC);
                console.log("updateFocusAreaCredits(): focusAreas new credits completed = " + newFocusAreaCreditsCompleted);
                focusAreasCreditsToMeet = parseInt(doc.data().creditsToMeet);
                console.log("updateFocusAreaCredits(): focusAreas credits to meet = " + focusAreasCreditsToMeet);
              }
            })

            await updateDoc(doc(db, focusAreaCollectionPath, "focusAreas"), {
              creditsCompleted: parseInt(newFocusAreaCreditsCompleted)
            })
            console.log("updateFocusAreaCredits(): updated credit count in focusAreas document");
            console.log("updateFocusAreaCredits() success");
          }
          await updateFocusAreaCredits();

          // special additional check for 4k focusArea module
          const moduleCodeNumbers = moduleCode.slice(-4);
          if (moduleCategory.includes("primaries")) {
            if (parseInt(moduleCodeNumbers) >= 4000) {
              // update the fourKModTaken field in the focusArea subgroup
              updateDoc(doc(db, userModuleCollectionPath, moduleCategory), {
                fourKModTaken: true
              })
              console.log("Selected module [" + moduleCode + "] is a 4k focusArea module, 4k+ focusArea requirement met");
            }
          }
        }

        let countedModuleCreditsGainedForGroup = parseInt(moduleMC);
        // if original group credits completed already met or exceeded the credits to meet
        if (moduleGroupCreditsCompleted >= moduleGroupCreditsToMeet) {
          // set the 'counted credits' counter to 0 as the original already exceeded the creditsToMeet
          countedModuleCreditsGainedForGroup = 0;
        }
        // else if the objective was only just met and exceeded
        else if (newModuleGroupCreditsCompleted > moduleGroupCreditsToMeet) {
          // set the 'counted credits' counter to only as many that add up to the creditsToMeet
          countedModuleCreditsGainedForGroup = moduleGroupCreditsToMeet - moduleGroupCreditsCompleted;
        }

        // update the fields in the main module group 
        // (creditsCompleted field in main commonCurriculum/programme/unrestrictedElectives documents)
        async function updateMainModuleGroupCredits() {
          console.log("updateMainModuleGroupCredits() called");
          const gradProgressCollectionPath = `users/${user.email}/gradProgress`;
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
              let currentMainModuleGroupCreditsCompleted = parseInt(mainModuleGroup.data().creditsCompleted);
              console.log("Main module group [" + mainModuleGroup.id + "] current credits completed = " + currentMainModuleGroupCreditsCompleted);
              if (userModuleCollectionPath.includes("focusAreas")) {
                if (focusAreasCreditsCompleted < focusAreasCreditsToMeet) {
                  if (newFocusAreaCreditsCompleted <= focusAreasCreditsToMeet) {
                    // count full
                    countedFocusAreasCreditsGained = parseInt(newFocusAreaCreditsCompleted) - parseInt(focusAreasCreditsCompleted);
                  }
                  else {
                    // count partial, up to creditsToMeet
                    countedFocusAreasCreditsGained = parseInt(focusAreasCreditsToMeet) - parseInt(focusAreasCreditsCompleted);
                  }
                }
                else {
                  // count none
                  countedFocusAreasCreditsGained = 0;
                }
                countedModuleCreditsGainedForGroup = parseInt(countedFocusAreasCreditsGained);
              }
              console.log("Main module group [" + mainModuleGroup.id + "] counted credits gained = " + countedModuleCreditsGainedForGroup);
              let newMainModuleGroupCreditsCompleted = currentMainModuleGroupCreditsCompleted + countedModuleCreditsGainedForGroup;
              console.log("Main module group [" + mainModuleGroup.id + "] new credits completed = " + newMainModuleGroupCreditsCompleted);
              let mainModuleGroupCreditsToMeet = parseInt(mainModuleGroup.data().creditsToMeet);
              console.log("Main module group [" + mainModuleGroup.id + "] credits to meet = " + mainModuleGroupCreditsToMeet);
              updateDoc(doc(db, gradProgressCollectionPath, mainModuleGroupName), {
                creditsCompleted: newMainModuleGroupCreditsCompleted
              })
              console.log("Updated credit count in main module group [" + mainModuleGroup.id + "]");
            }
          })
          console.log("updateMainModuleGroupCredits() success");
        }
        await updateMainModuleGroupCredits();

        // if an objective was met by adding this module (module group objective met)
        if ((moduleGroupCreditsCompleted < moduleGroupCreditsToMeet) && (newModuleGroupCreditsCompleted >= moduleGroupCreditsToMeet)) {
          console.log("Module group [" + moduleCategory + "] requirement met!");
          // update the fields in the main group
          if (userModuleCollectionPath.includes("commonCurriculum")) {
            if (userModuleCollectionPath.includes("universityLevel")) {
              // update the fulfilment in the subgroup itself as well
              await updateDoc(doc(db, userModuleCollectionPath, moduleCategory), {
                uLSubgroup_fulfilment: true
              })
              console.log("Updated fulfilment field for group + [" + moduleCategory + "]");

              // check other universityLevel subgroups to see if it's the last one
              async function checkUniversityLevelFulfilment() {
                console.log("checkUniversityLevelFulfilment() called");
                let returnBool = true;
                const collectionPath = retrieveUserModuleCreditTrackerPath(user.email, "communitiesAndEngagement");
                const collectionRef = collection(db, collectionPath);
                const querySnapshot = await getDocs(collectionRef);
                querySnapshot.forEach((uLSubgroup) => {
                  if (uLSubgroup.data().uLSubgroup_fulfilment === false) {
                    returnBool = false;
                  }
                });
                console.log("checkUniversityLevelFulfilment() success: universityLevel requirement fulfilment is " + returnBool);
                return returnBool;
              }
              // if all universityLevel subgroups have been satisfied
              if (await checkUniversityLevelFulfilment() === true) {
                // set universityLevel_fulfilment to true
                updateDoc(doc(db, `users/${user.email}/gradProgress`, "commonCurriculum"), {
                  universityLevel_fulfilment: true
                })
                console.log("Updated universityLevel fulfilment field to true");
              }
            }
            // if not universityLevel (computingEthics, crossDisciplinaryEducation, interdisciplinaryEducation)
            else {
              // set computingEthics_fulfilment / crossDisciplinaryEducation_fulfilment / interdisciplinaryEducation_fulfilment to true
              if (moduleCategory === "computingEthics") {
                updateDoc(doc(db, `users/${user.email}/gradProgress`, "commonCurriculum"), {
                  computingEthics_fulfilment: true
                })
              }
              else if (moduleCategory === "crossDisciplinaryEducation") {
                updateDoc(doc(db, `users/${user.email}/gradProgress`, "commonCurriculum"), {
                  crossdisciplinaryEducation_fulfilment: true
                })
              }
              else {
                updateDoc(doc(db, `users/${user.email}/gradProgress`, "commonCurriculum"), {
                  interdisciplinaryEducation_fulfilment: true
                })
              }
              console.log("Updated [" + moduleCategory + "] fulfilment field to true");
            }
            await checkAndSetCommonCurriculumOverallFulfilment();
            // for programme requirement modules
          } else if (userModuleCollectionPath.includes("programme")) {
            // is a focusArea, meaning a focusArea was cleared
            if (userModuleCollectionPath.includes("focusAreas")) {
              // check that the 4k mod requirement has been met as well
              async function checkFocusArea4kFulfilment() {
                console.log("checkFocusArea4kFulfilment() called");
                let returnBool = false;
                const focusAreaCollectionPath = retrieveUserModuleCreditTrackerPath(user.email, moduleCategory);
                const focusAreaCollection = collection(db, focusAreaCollectionPath);
                const focusAreaQuerySnapshot = await getDocs(focusAreaCollection);
                focusAreaQuerySnapshot.forEach((focusAreaSubgroup) => {
                  if (focusAreaSubgroup.id === moduleCategory) {
                    returnBool = focusAreaSubgroup.data().fourKModTaken;
                  }
                });
                console.log("checkFocusArea4kFulfilment() success");
                return returnBool;
              }
              let focusArea4kFulfilment = await checkFocusArea4kFulfilment(moduleCategory);

              // if 4k module requirement met
              if (focusArea4kFulfilment) {
                // update the fulfilment in the focusArea subgroup (oneFocusAreaCompleted field)
                await updateDoc(doc(db, `users/${user.email}/gradProgress/programme/breadthAndDepth`, "focusAreas"), {
                  oneFocusAreaCompleted: true,
                })
                console.log("Updated focusArea 4k requirement field to true");

                // check creditsCompleted for focusAreas
                async function checkFocusAreasCreditsCompleted() {
                  console.log("checkFocusAreasCompleted() called");
                  let returnInt = 0;
                  const focusAreasCollectionPath = `users/${user.email}/gradProgress/programme/breadthAndDepth`;
                  const focusAreasCollection = collection(db, focusAreasCollectionPath);
                  const focusAreasQuerySnapshot = await getDocs(focusAreasCollection);
                  focusAreasQuerySnapshot.forEach((subDoc) => {
                    if (subDoc.id === "focusAreas") {
                      returnInt = parseInt(subDoc.data().creditsCompleted);
                    }
                  });
                  console.log("checkFocusAreasCompleted() success: focusAreas credits completed = " + returnInt);
                  return returnInt;
                }

                // if 20MC focusArea credit requirement met
                if (await checkFocusAreasCreditsCompleted() >= 20) {
                  // update the fulfilment in the focusArea subgroup (focusArea_fulfilment field)
                  await updateDoc(doc(db, `users/${user.email}/gradProgress/programme/breadthAndDepth`, "focusAreas"), {
                    focusAreas_fulfilment: true,
                  })
                  console.log("Updated focusAreas fulfilment to true (>=20 focusArea credits)");
                }

                // check other breadthAndDepth subgroups to see if it's the last one
                let industryExperienceFulfilment = false;
                async function checkIndustryExperienceFulfilment() {
                  console.log("checkIndustryExperienceFulfilment() called");
                  let returnBool = false;
                  const breadthAndDepthCollectionPath = `users/${user.email}/gradProgress/programme/breadthAndDepth`;
                  const breadthAndDepthCollection = collection(db, breadthAndDepthCollectionPath);
                  const breadthAndDepthQuerySnapshot = await getDocs(breadthAndDepthCollection);
                  breadthAndDepthQuerySnapshot.forEach((breadthAndDepthSubgroup) => {
                    if (breadthAndDepthSubgroup.id === "industryExperience") {
                      returnBool = breadthAndDepthSubgroup.data().industryExperience_fulfilment;
                    }
                  })
                  console.log("checkIndustryExperienceFulfilment() success: industryExperience requirement met is " + returnBool);
                  return returnBool;
                }
                industryExperienceFulfilment = checkIndustryExperienceFulfilment();

                async function checkBreadthAndDepthCredits() {
                  console.log("checkBreadthAndDepthCredits() called");
                  let returnInt = 0;
                  let focusAreasCreditsCompleted = 0;
                  let industryExperienceCreditsCompleted = 0;
                  let countedFocusAreasCredits = 0;
                  let countedIndustryExperienceCredits = 0;
                  const breadthAndDepthCollectionPath = `users/${user.email}/gradProgress/programme/breadthAndDepth`;
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
                  console.log("checkBreadthAndDepthCredits() success: breadthAndDepth credits = " + returnInt + "/32");
                  return returnInt;
                }

                // all breadthAndDepth requirements fulfilled
                if (industryExperienceFulfilment && await checkBreadthAndDepthCredits() >= 32) {
                  // set breadthAndDepth_fulfilment to true
                  updateDoc(doc(db, `users/${user.email}/gradProgress`, "programme"), {
                    breadthAndDepth_fulfilment: true
                  });
                  console.log("Updated breadthAndDepth fulfilment to true");
                }
              }
              // else, focus area 4k module requirement not met
              else {
                console.log("focusArea 4k requirement is false");
              }
            }
            // industryExperience
            else if (moduleCategory.includes("industryExperience")) {
              // update the fulfilment in the industryExperience subgroup (industryExperience_fulfilment field)
              await updateDoc(doc(db, `users/${user.email}/gradProgress/programme/breadthAndDepth`, "industryExperience"), {
                industryExperience_fulfilment: true
              })
              console.log("Updating industryExperience fulfilment field to true");

              // check other breadthAndDepth subgroups to see if it's the last one
              let focusAreaFulfilment = false;
              async function checkFocusAreaFulfilment() {
                console.log("checkFocusAreaFulfilment() called");
                let returnBool = false;
                const breadthAndDepthCollectionPath = `users/${user.email}/gradProgress/programme/breadthAndDepth`;
                const breadthAndDepthCollection = collection(db, breadthAndDepthCollectionPath);
                const breadthAndDepthQuerySnapshot = await getDocs(breadthAndDepthCollection);
                breadthAndDepthQuerySnapshot.forEach((breadthAndDepthSubgroup) => {
                  if (breadthAndDepthSubgroup.id === "focusAreas") {
                    returnBool = breadthAndDepthSubgroup.data().focusAreas_fulfilment;
                  }
                })
                console.log("checkFocusAreaFulfilment() success: focusAreas fulfilment is " + returnBool);
                return returnBool;
              }
              focusAreaFulfilment = checkFocusAreaFulfilment();

              // function which calculates total number of credits completed for breadthAndDepth subgroup
              // by adding up the credits from focusAreas and industryExperience sub-subgroups
              // updates the 'creditsCompleted' field in the breadthAndDepth document, under programme main group
              async function checkBreadthAndDepthCredits() {
                console.log("checkBreadthAndDepthCredits() called");
                let returnInt = 0;
                let focusAreasCreditsCompleted = 0;
                let countedFocusAreasCreditsCompleted = 0;
                let industryExperienceCreditsCompleted = 0;
                let countedIndustryExperienceCreditsCompleted = 0;
                const breadthAndDepthCollectionPath = `users/${user.email}/gradProgress/programme/breadthAndDepth`;
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
                console.log("checkBreadthAndDepthCredits() success: breadthAndDepth credits = " + returnInt + "/32");
                return returnInt;
              }

              // all breadthAndDepth requirements fulfilled
              if (focusAreaFulfilment && await checkBreadthAndDepthCredits() >= 32) {
                // set breadthAndDepth_fulfilment to true
                updateDoc(doc(db, `users/${user.email}/gradProgress`, "programme"), {
                  breadthAndDepth_fulfilment: true
                });
                console.log("Updated breadthAndDepth fulfilment to true");
              }
            }
            // mathematicsAndSciences or foundation
            else {
              // mathematicsAndSciences
              if (moduleCategory === "mathematicsAndSciences") {
                updateDoc(doc(db, `users/${user.email}/gradProgress`, "programme"), {
                  mathematicsAndSciences_fulfilment: true
                })
              }
              // foundation
              else {
                updateDoc(doc(db, `users/${user.email}/gradProgress`, "programme"), {
                  foundation_fulfilment: true
                })
              }
              console.log("Updated [" + moduleCategory + "] fulfilment to true");
            }
            await checkAndSetProgrammeOverallFulfilment();
            // for unrestrictedElective requirement modules
          } else {
            await checkAndSetUnrestrictedElectivesOverallFulfilment();
          }
        }  

        // set open module added success snackbar
        setOpenModuleAddedSuccessSnackBar(true);

        // close recommended module pill menu
        setMenu(null);

      }
      // module taken before (moduleAlreadyTaken() returns false)
      else {
        console.log("module already taken!");

        // set open module added error snackbar
        setOpenModuleAddedErrorSnackBar(true);

        // close recommended module pill menu
        setMenu(null);
      }
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
        <MenuItem onClick={handleAdd}>Add to Module Planner</MenuItem>
      </Menu>

      {/* SUCCESS SNACKBAR */}
      {/* snackbar displays only when module is successfully added to module planner */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openModuleAddedSuccessSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography variant="tag_thin">
            Module has been successfully added to module planner.
          </Typography>
        </Alert>
      </Snackbar>

      {/* ERROR SNACKBAR */}
      {/* snackbar displays only when module is already added to module planner */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openModuleAddedErrorSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          <Typography variant="tag_thin">
            Module has been already added to module planner.
          </Typography>
        </Alert>
      </Snackbar>
    </>
  )
}

export default RecommendedModulePillMenu