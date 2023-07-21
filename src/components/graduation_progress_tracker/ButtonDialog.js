// styles

// components / pages / images
import MainButton from '../common/MainButton';
import FormField from '../common/FormField';

// tools
import * as React from 'react';
import {
  Typography, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  Stack, Autocomplete, TextField, Snackbar, Alert
} from '@mui/material'
import { auth, db } from '../others/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, setDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import { useEffect, useState } from 'react';

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
  },
  {
    groupName: "unrestrictedElectives",
    collectionPath: '/graduationRequirements/computerScience/unrestrictedElectives/unrestrictedElectives/unrestrictedElectives'
  }
];

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

const ButtonDialog = ({ modLibrary, button_text, header, text, onSubmit, yearSem }) => {

  // handles currently signed-in user
  const [user, setUser] = useState({});

  // function to get the currently signed-in user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [])

  // snackbar state
  const [openModuleAlreadyAddedSnackBar, setOpenModuleAlreadyAddedSnackBar] = useState(false);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenModuleAlreadyAddedSnackBar(false);
  }

  // handles module planner module list
  const [moduleList, setModuleList] = useState([]);

  // handles module exemptions module list
  const [exemptedModuleList, setExemptedModuleList] = useState([]);

  // for testing (module planner)
  const static_moduleList = [
    {
      moduleCode: 'CS1101S',
      moduleName: 'Programming Methodology I',
      moduleMC: '4',
      moduleCategory: 'foundation'
    },
    {
      moduleCode: 'CS1231S',
      moduleName: 'Discrete Structures',
      moduleMC: '4',
      moduleCategory: 'foundation'
    },
    {
      moduleCode: 'GEA1000',
      moduleName: 'Quantitative Reasoning with Data',
      moduleMC: '6',
      moduleCategory: 'dataLiteracy'
    },
    {
      moduleCode: 'MA0001',
      moduleName: 'Sample Math Module 1',
      moduleMC: '12',
      moduleCategory: 'mathematicsAndSciences'
    },
    {
      moduleCode: 'GEA1001',
      moduleName: 'Sample dataLiteracy Module 1',
      moduleMC: '4',
      moduleCategory: 'dataLiteracy'
    },
    {
      moduleCode: 'IS1109',
      moduleName: 'Sample digitalLiteracy Module 2',
      moduleMC: '4',
      moduleCategory: 'digitalLiteracy'
    },
    {
      moduleCode: 'FF0003',
      moduleName: 'Sample Foundation Module 3',
      moduleMC: '4',
      moduleCategory: 'foundation'
    },
    {
      moduleCode: 'CS7777',
      moduleName: 'Sample computerSecurity_primaries Module 4',
      moduleMC: '12',
      moduleCategory: 'computerSecurity_primaries'
    },
    {
      moduleCode: 'CS6666',
      moduleName: 'Sample artificialIntelligence_primaries Module',
      moduleMC: '12',
      moduleCategory: 'artificialIntelligence_primaries'
    },
    {
      moduleCode: 'CS5555',
      moduleName: 'Sample algorithmsAndTheory_primaries Module',
      moduleMC: '12',
      moduleCategory: 'algorithmsAndTheory_primaries'
    },
    {
      moduleCode: 'FF0006',
      moduleName: 'Sample Foundation Module 6',
      moduleMC: '20',
      moduleCategory: 'foundation'
    },
    {
      moduleCode: 'FF0007',
      moduleName: 'Sample Foundation Module 7',
      moduleMC: '16',
      moduleCategory: 'foundation'
    },
    {
      moduleCode: 'IE0001',
      moduleName: 'Sample industryExperience Module 7',
      moduleMC: '12',
      moduleCategory: 'industryExperience'
    },
    {
      moduleCode: 'IE0002',
      moduleName: 'Sample industryExperience Module',
      moduleMC: '4',
      moduleCategory: 'industryExperience'
    },
  ];

  // // code for dynamically retrieving modules from graduationRequirements collection in the database
  // useEffect(() => {
  //   console.log("useeffect called");
  //   setModuleList([]);
  //   let arrayOfAllModules = [];

  //   // cycle through all modules in arrayOfModuleGroups (each object has a groupName and a collectionPath property)
  //   moduleGroupsArray.forEach(courseCollection => {
  //     let arrayOfModules = [];

  //     async function loadModuleList() {
  //       try {
  //         // code below reads all the modules from database and displays
  //         // each of them in the add module dropdown list
  //         const courseCollectionRef = collection(db, courseCollection.collectionPath);
  //         const courseCollectionSnapshot = await getDocs(courseCollectionRef);
  //         courseCollectionSnapshot.forEach(moduleItem => {
  //             // for each module in the collection
  //             const newModule = {
  //               "moduleCode": moduleItem.data().moduleCode,
  //               "moduleMC": moduleItem.data().moduleMC,
  //               "moduleName": moduleItem.data().moduleName,
  //               "moduleCategory": moduleItem.data().moduleCategory
  //             }
  //             // add module to arrayOfModules (for the collection)
  //             arrayOfModules.push(newModule);
  //             console.log("added module: " + newModule.moduleCode);
  //           })
  //         // add arrayOfModules to arrayOfAllModules (for all collections)
  //         arrayOfAllModules = arrayOfAllModules.concat(arrayOfModules);
  //         // update moduleList state with the latest arrayOfAllModules
  //         setModuleList(arrayOfAllModules);
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //     loadModuleList();
  //   });
  // }, [user]);

  // // code for dynamically retrieving modules from exemptionLibrary collection in the database
  // useEffect(() => {
  //   console.log("useeffect called");
  //   setExemptedModuleList([]);
  //   let arrayOfAllExemptions = [];

  //   async function loadExemptionsList() {
  //     try {
  //       // code below reads all the modules from database and displays
  //       // each of them in the add module dropdown list
  //       const courseCollectionRef = collection(db, "exemptionLibrary");
  //       const courseCollectionSnapshot = await getDocs(courseCollectionRef);
  //       courseCollectionSnapshot.forEach(exemptionItem => {
  //           // for each module in the collection
  //           const newExemption = {
  //             "moduleCode": exemptionItem.data().moduleCode,
  //             "moduleMC": exemptionItem.data().moduleMC,
  //             "moduleName": exemptionItem.data().moduleName,
  //             "moduleCategory": exemptionItem.data().moduleCategory
  //           }
  //           // add module to arrayOfAllExemptions (for the collection)
  //           arrayOfAllExemptions.push(newExemption);
  //           console.log("added module: " + newExemption.moduleCode);
  //           // update exemptionList state with the latest arrayOfAllExemptions
  //           setExemptedModuleList(arrayOfAllExemptions)
  //         })
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   loadExemptionsList();
  // }, [user]);

  // for testing (module exemptions)
  const static_exemptedModuleList = [
    {
      moduleCode: 'MA1301',
      moduleName: 'Introductory Mathematics',
      moduleMC: '4',
      moduleCategory: 'unrestrictedElectives'
    },
    {
      moduleCode: 'BT1101',
      moduleName: 'Introduction to Business Analytics',
      moduleMC: '4',
      moduleCategory: 'dataLiteracy'
    },
  ]

  // module planner module list
  const moduleCodeList = static_moduleList.map(module => module.moduleCode);
  const moduleNameList = static_moduleList.map(module => module.moduleName);
  const moduleMCList = static_moduleList.map(module => module.moduleMC);
  const moduleCategoryList = static_moduleList.map(module => module.moduleCategory);
  // const moduleCodeList = moduleList.map(module => module.moduleCode);
  // const moduleNameList = moduleList.map(module => module.moduleName);
  // const moduleMCList = moduleList.map(module => module.moduleMC);
  // const moduleCategoryList = moduleList.map(module => module.moduleCategory);

  // module exemptions module list
  const exemptedModuleCodeList = static_exemptedModuleList.map(module => module.moduleCode);
  const exemptedModuleNameList = static_exemptedModuleList.map(module => module.moduleName);
  const exemptedModuleMCList = static_exemptedModuleList.map(module => module.moduleMC);
  const exemptedModuleCategoryList = static_exemptedModuleList.map(module => module.moduleCategory);
  // const exemptedModuleCodeList = exemptedModuleList.map(module => module.moduleCode);
  // const exemptedModuleNameList = exemptedModuleList.map(module => module.moduleName);
  // const exemptedModuleMCList = exemptedModuleList.map(module => module.moduleMC);
  // const exemptedModuleCategoryList = exemptedModuleList.map(module => module.moduleCategory);

  const [open, setOpen] = React.useState(false);
  const [moduleCode, setModuleCode] = React.useState("");
  const [moduleName, setModuleName] = React.useState("");
  const [moduleMC, setModuleMC] = React.useState(0);
  const [moduleCategory, setModuleCategory] = React.useState("");
  const yearSemCode = yearSem.replace(/ /g, '');

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

  // function which updates the credit count in the database,
  // given the module category, path in database, and number of credits to add
  // by accessing the 'creditsToMeet' and 'creditsCompleted' fields in the given collection path
  async function updateCreditCount(moduleCategory, collectionPath, creditsToAdd) {
    try {
      // obtain current credit count
      const querySnapshot = await getDocs(collection(db, collectionPath));
      let currentCreditCount = 0;
      let creditsToMeet = 0;
      querySnapshot.forEach((doc) => {
        currentCreditCount = parseInt(doc.data().creditsCompleted);
        creditsToMeet = doc.data().creditsToMeet;
      })
      // calculate new credit count
      const newCreditCount = (currentCreditCount + creditsToAdd).toString();
      // update credit count with new credit count
      await setDoc(doc(db, collectionPath, moduleCategory), {
        creditsCompleted: newCreditCount,
        creditsToMeet: creditsToMeet
      });
    }
    catch (error) {
      console.log(error.message);
    }
  }

  // function to retrieve the path to the collection storing all modules one can take
  // to fulfil the requirements for the module group
  function retrieveModuleGroupCollectionPath(moduleCategory) {
    let moduleCollectionPath = "";
    moduleGroupsArray.forEach((moduleGroup) => {
      if (moduleGroup.groupName === moduleCategory) {
        moduleCollectionPath = moduleGroup.collectionPath;
      }
    });
    return moduleCollectionPath;
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
          return true;
        }
        else {
          updateDoc(doc(db, `users/${user.email}/gradProgress`, "commonCurriculum"), {
            overall_fulfilment: false
          })
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
          return true;
        }
        else {
          updateDoc(doc(db, `users/${user.email}/gradProgress`, "programme"), {
            overall_fulfilment: false
          })
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
          return true;
        }
        else {
          updateDoc(doc(db, `users/${user.email}/gradProgress`, "unrestrictedElectives"), {
            overall_fulfilment: false
          })
          return false;
        }
      }
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setModuleCode("");
    setModuleName("");
    setModuleMC(0);
    setOpen(false);
  };

  const handleAdd = async () => {
    try {
      console.log("current user email is: " + user.email);
      let totalNumModules = 0;

      async function moduleAlreadyTaken() {
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
        // no module found in user's 'allModules' collection with the same module code,
        // means they haven't taken the module before
        return returnBool;
      }

      if (await moduleAlreadyTaken() === false) {
        // create new document in 'modules' with new module details
        await setDoc(doc(db, `users/${user.email}/modules`, moduleCode), {
          moduleID: v4(),
          moduleCode: moduleCode,
          moduleName: moduleName,
          moduleMC: moduleMC,
          moduleCategory: moduleCategory,
          yearSem: yearSemCode
        })

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
              console.log("module group credits completed: " + parseInt(moduleGroupInCollection.data().creditsCompleted));
              moduleGroupCreditsToMeet = parseInt(moduleGroupInCollection.data().creditsToMeet);
              console.log("module group credits to meet: " + parseInt(moduleGroupInCollection.data().creditsToMeet));
            }
          });
        }
        await retrieveUserModuleGroupProgress();

        newModuleGroupCreditsCompleted = parseInt(moduleGroupCreditsCompleted) + parseInt(moduleMC);
        console.log("original credits completed for " + moduleCategory + ": " + moduleGroupCreditsCompleted);
        console.log("new credits completed for " + moduleCategory + ": " + newModuleGroupCreditsCompleted);
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
        console.log("counted credits gained towards overall: " + countedModuleCreditsGainedForGroup);

        // obtain path to collection containing data for the module group, pertaining to the user
        const userModuleCollectionPath = retrieveUserModuleCreditTrackerPath(user.email, moduleCategory);

        // update the fields in the document for the module subgroup (except for unrestrictedElectives)
        if (!moduleCategory.includes("unrestrictedElectives")) {
          console.log("[update fields in document for module subgroup] moduleCategory is " + moduleCategory + ", path is " + userModuleCollectionPath);
          await updateDoc(doc(db, userModuleCollectionPath, moduleCategory), {
            creditsCompleted: newModuleGroupCreditsCompleted,
            creditsToMeet: moduleGroupCreditsToMeet
          })
        }

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
            const focusAreaCollectionPath = `users/${user.email}/gradProgress/programme/breadthAndDepth`;
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
            console.log("focusAreas credits to meet: " + focusAreasCreditsToMeet);
            await updateDoc(doc(db, focusAreaCollectionPath, "focusAreas"), {
              creditsCompleted: parseInt(newFocusAreaCreditsCompleted)
            })
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
            console.log("countedFocusAreasCreditsGained is " + countedFocusAreasCreditsGained);
          }
          await updateFocusAreaCredits();
        }

        // update the fields in the main module group 
        // (creditsCompleted field in main commonCurriculum/programme/unrestrictedElectives documents)
        async function updateMainModuleGroupCredits() {
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
              console.log("main module group is " + mainModuleGroupName);
              console.log("updating main module credits, current credits completed = " + currentMainModuleGroupCreditsCompleted);
              console.log("userModuleCollectionPath is: " + userModuleCollectionPath);
              if (userModuleCollectionPath.includes("focusAreas")) {
                console.log("userModuleCollectionPath includes focusAreas, set countedModuleCreditsGainedForGroup to countedFocusAreasCreditsGained");
                countedModuleCreditsGainedForGroup = parseInt(countedFocusAreasCreditsGained);
              }
              console.log("new credits completed = " + countedModuleCreditsGainedForGroup);
              let newMainModuleGroupCreditsCompleted = currentMainModuleGroupCreditsCompleted + countedModuleCreditsGainedForGroup;
              updateDoc(doc(db, gradProgressCollectionPath, mainModuleGroupName), {
                creditsCompleted: newMainModuleGroupCreditsCompleted
              })
              console.log("updated main module credits, " + newMainModuleGroupCreditsCompleted);
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
                creditsCompleted: parseInt(newModuleGroupCreditsCompleted),
                creditsToMeet: parseInt(moduleGroupCreditsToMeet),
                uLSubgroup_fulfilment: true
              })

              // check other universityLevel subgroups to see if it's the last one
              async function checkUniversityLevelFulfilment() {
                let returnBool = true;
                const collectionPath = retrieveUserModuleCreditTrackerPath(user.email, "communitiesAndEngagement");
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
                updateDoc(doc(db, `users/${user.email}/gradProgress`, "commonCurriculum"), {
                  universityLevel_fulfilment: true
                })
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
            }
            await checkAndSetCommonCurriculumOverallFulfilment();
            // for programme requirement modules
          } else if (userModuleCollectionPath.includes("programme")) {
            // is a focusArea, meaning a focusArea was cleared
            if (userModuleCollectionPath.includes("focusAreas")) {
              // check that the 4k mod requirement has been met as well
              async function checkFocusArea4kFulfilment() {
                let returnBool = false;
                const focusAreaCollectionPath = retrieveUserModuleCreditTrackerPath(user.email, moduleCategory);
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
                await updateDoc(doc(db, `users/${user.email}/gradProgress/programme/breadthAndDepth`, "focusAreas"), {
                  oneFocusAreaCompleted: true,
                })

                // check creditsCompleted for focusAreas
                async function checkFocusAreasCreditsCompleted() {
                  let returnInt = 0;
                  const focusAreasCollectionPath = `users/${user.email}/gradProgress/programme/breadthAndDepth`;
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
                  await updateDoc(doc(db, `users/${user.email}/gradProgress/programme/breadthAndDepth`, "focusAreas"), {
                    focusAreas_fulfilment: true,
                  })
                }

                // check other breadthAndDepth subgroups to see if it's the last one
                let industryExperienceFulfilment = false;
                async function checkIndustryExperienceFulfilment() {
                  let returnBool = false;
                  const breadthAndDepthCollectionPath = `users/${user.email}/gradProgress/programme/breadthAndDepth`;
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
                  console.log("breadthanddepthcredits: " + returnInt);
                  return returnInt;
                }

                // all breadthAndDepth requirements fulfilled
                if (industryExperienceFulfilment && await checkBreadthAndDepthCredits() >= 32) {
                  // set breadthAndDepth_fulfilment to true
                  updateDoc(doc(db, `users/${user.email}/gradProgress`, "programme"), {
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
              await updateDoc(doc(db, `users/${user.email}/gradProgress/programme/breadthAndDepth`, "industryExperience"), {
                industryExperience_fulfilment: true
              })

              // check other breadthAndDepth subgroups to see if it's the last one
              let focusAreaFulfilment = false;
              async function checkFocusAreaFulfilment() {
                let returnBool = false;
                const breadthAndDepthCollectionPath = `users/${user.email}/gradProgress/programme/breadthAndDepth`;
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
                return returnInt;
              }

              // all breadthAndDepth requirements fulfilled
              if (focusAreaFulfilment && await checkBreadthAndDepthCredits() >= 32) {
                // set breadthAndDepth_fulfilment to true
                updateDoc(doc(db, `users/${user.email}/gradProgress`, "programme"), {
                  breadthAndDepth_fulfilment: true
                });
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
            }
            await checkAndSetProgrammeOverallFulfilment();
            // for unrestrictedElective requirement modules
          } else {
            await checkAndSetUnrestrictedElectivesOverallFulfilment();
          }
        }

        // update progress rings and progress bar
        //GraduationProgressTracker();      

        // close button dialog
        setOpen(false);

        // add module to user interface and retrieve credits from firebase
        onSubmit(moduleCode, moduleName, moduleMC, moduleCategory, yearSem);

      }
      // module taken before (moduleAlreadyTaken() returns true)
      else {
        console.log("module already taken!");
        setOpenModuleAlreadyAddedSnackBar(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <MainButton type="text" main_color="dark_gray.main" value={button_text} onClickAction={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <Stack padding="24px">
          <DialogTitle>
            <Typography variant="h3" color="black.main">{header}</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="body_thin" color="black.main">{text}</Typography>
            </DialogContentText>
            <Stack gap="16px" marginTop="16px">
              {/* module code autocomplete */}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={modLibrary === "exemptions" ? exemptedModuleCodeList : moduleCodeList}
                fullWidth
                defaultValue=""
                value={moduleCode}
                onChange={(event, newValue) => {
                  const moduleCodeListUsed = modLibrary === "exemptions" ? exemptedModuleCodeList : moduleCodeList;
                  const moduleNameListUsed = modLibrary === "exemptions" ? exemptedModuleNameList : moduleNameList;
                  const moduleMCListUsed = modLibrary === "exemptions" ? exemptedModuleMCList : moduleMCList;
                  const moduleCategoryListUsed = modLibrary === "exemptions" ? exemptedModuleCategoryList : moduleCategoryList;

                  setModuleCode(newValue);
                  const correspondingModuleName = moduleNameListUsed[moduleCodeListUsed.indexOf(newValue)];
                  setModuleName(correspondingModuleName);
                  console.log(correspondingModuleName);
                  const correspondingModuleMC = moduleMCListUsed[moduleCodeListUsed.indexOf(newValue)];
                  setModuleMC(correspondingModuleMC);
                  console.log(correspondingModuleMC);
                  const correspondingModuleCategory = moduleCategoryListUsed[moduleCodeListUsed.indexOf(newValue)];
                  setModuleCategory(correspondingModuleCategory);
                  console.log(correspondingModuleCategory);
                }}
                renderInput={(params) => <TextField {...params} label="Module Code" />}
                onInputChange={(event, inputValue) => {
                  console.log("live module code update: " + inputValue);
                }}
              />
              {/* module name autocomplete */}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={modLibrary === "exemptions" ? exemptedModuleNameList : moduleNameList}
                fullWidth
                defaultValue=""
                value={moduleName}
                onChange={(event, newValue) => {
                  const moduleCodeListUsed = modLibrary === "exemptions" ? exemptedModuleCodeList : moduleCodeList;
                  const moduleNameListUsed = modLibrary === "exemptions" ? exemptedModuleNameList : moduleNameList;
                  const moduleMCListUsed = modLibrary === "exemptions" ? exemptedModuleMCList : moduleMCList;
                  const moduleCategoryListUsed = modLibrary === "exemptions" ? exemptedModuleCategoryList : moduleCategoryList;

                  setModuleName(newValue);
                  const correspondingModuleCode = moduleCodeListUsed[moduleNameListUsed.indexOf(newValue)];
                  setModuleCode(correspondingModuleCode);
                  console.log(correspondingModuleCode);
                  const correspondingModuleMC = moduleMCListUsed[moduleNameListUsed.indexOf(newValue)];
                  setModuleMC(correspondingModuleMC);
                  console.log(correspondingModuleMC);
                  const correspondingModuleCategory = moduleCategoryListUsed[moduleNameListUsed.indexOf(newValue)];
                  setModuleCategory(correspondingModuleCategory);
                  console.log(correspondingModuleCategory);
                }}
                renderInput={(params) => <TextField {...params} label="Module Name" />}
                onInputChange={(event, inputValue) => {
                  console.log("live module name update: " + inputValue);
                }}
              />
              {/* module mc disabled text field */}
              <TextField
                disabled
                id="outlined-disabled"
                label="Module MC"
                defaultValue={0}
                value={moduleMC}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <MainButton type="text" main_color="blue.main" value="CANCEL" onClickAction={handleClose} />
            <MainButton type="text" main_color="blue.main" value="ADD" onClickAction={handleAdd} />
          </DialogActions>
        </Stack>
      </Dialog>

      {/* ERROR SNACKBAR */}
      {/* snackbar displays only when module is already added */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openModuleAlreadyAddedSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          <Typography variant="tag_thin">
            Module has already been added to the module planner.
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
}

export default ButtonDialog