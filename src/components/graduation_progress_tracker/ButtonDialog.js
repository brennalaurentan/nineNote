// styles

// components / pages / images
import MainButton from '../common/MainButton';
import FormField from '../common/FormField';

// tools
import * as React from 'react';
import {
  Typography, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  Stack, Autocomplete, TextField
} from '@mui/material'
import { auth, db } from '../others/firebase';
import { getAuth } from 'firebase/auth';
import { query, collection, setDoc, getDocs, doc } from 'firebase/firestore';
import { v4 } from 'uuid';

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
  }
]

const ButtonDialog = ({ button_text, header, text, onSubmit, yearSem }) => {
  // for testing
  const moduleList = [
    {
      moduleCode: 'CS1101S',
      moduleName: 'Programming Methodology I',
      moduleMC: '4',
      moduleCategory: 'foundation'
    },
    {
      moduleCode: 'CS1231S',
      moduleName: 'Discrete Structures',
      moduleMC: '5',
      moduleCategory: 'foundation'
    },
    {
      moduleCode: 'GEA1000',
      moduleName: 'Quantitative Reasoning with Data',
      moduleMC: '6',
      moduleCategory: 'dataLiteracy'
    },
    {
      moduleCode: 'MA1521',
      moduleName: 'Calculus for Computing',
      moduleMC: '7',
      moduleCategory: 'mathematicsAndSciences'
    },
  ];

  const moduleCodeList = moduleList.map(module => module.moduleCode);
  const moduleNameList = moduleList.map(module => module.moduleName);
  const moduleMCList = moduleList.map(module => module.moduleMC);
  const moduleCategoryList = moduleList.map(module => module.moduleCategory);

  const [open, setOpen] = React.useState(false);
  const [moduleCode, setModuleCode] = React.useState("");
  const [moduleName, setModuleName] = React.useState("");
  const [moduleMC, setModuleMC] = React.useState(0);
  const [moduleCategory, setModuleCategory] = React.useState("");
  const yearSemCode = yearSem.replace(/ /g, '');

  /*
  // function to retrieve the path to the collection which stores all the modules
  // you can take to fulfil a specified module category/group
  function retrieveModuleGroupLogCollectionPath(moduleCategory, userEmail) {
    try {

    }
  }*/

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
    setOpen(false);
    onSubmit(moduleCode, moduleName, moduleMC, yearSem);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const currentUserEmail = user.email;

      const userModulesBySemesterSnapshot = await getDocs(collection(db, `users/${currentUserEmail}/modules/`));
      let docCount = 0;
      userModulesBySemesterSnapshot.forEach((semesterDoc) => {
        if (semesterDoc.id === yearSemCode) {
          docCount = semesterDoc.data().numModules;
        }
      })

      // obtain index of next module to add
      const docNextIndex = docCount + 1;

      // create new collection with new module details
      await setDoc(doc(db, `users/${currentUserEmail}/modules/${yearSemCode}/module_${docNextIndex}`, 'moduleDetails'), {
        moduleID: v4(),
        moduleCode: moduleCode,
        moduleName: moduleName,
        moduleMC: moduleMC,
        moduleCategory: moduleCategory
      });

      // update numModules property (field) in firestore
      await setDoc(doc(db, `users/${currentUserEmail}/modules`, yearSemCode), {
        numModules: docNextIndex
      });

      // check if module already exists on user's profile
      let modulesTakenForGroup = [];

      // retrieve path to collection containing all modules you can take to satisfy the
      // specified module group
      let moduleGroupCollectionPath = retrieveModuleGroupCollectionPath(moduleCategory);

      // retrieve path to collection containing fields which tracks the user's credit progress for that module group
      let userModuleCreditTrackerPath = retrieveUserModuleCreditTrackerPath(currentUserEmail, moduleCategory);
      console.log("path obtained is: " + userModuleCreditTrackerPath);

      // add to credit count in user's database profile
      //updateCreditCount(moduleCategory, userModuleCreditTrackerPath, moduleMC);

      // // updated progress rings
      // moduleGroupsArray.forEach((moduleGroup) => {
      //   if (moduleCategory = moduleGroup.moduleCategory) {

      //   }
      // })
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
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
                options={moduleCodeList}
                fullWidth
                defaultValue=""
                value={moduleCode}
                onChange={(event, newValue) => {
                  setModuleCode(newValue);
                  const correspondingModuleName = moduleNameList[moduleCodeList.indexOf(newValue)];
                  setModuleName(correspondingModuleName);
                  console.log(correspondingModuleName);
                  const correspondingModuleMC = moduleMCList[moduleCodeList.indexOf(newValue)];
                  setModuleMC(correspondingModuleMC);
                  console.log(correspondingModuleMC);
                  const correspondingModuleCategory = moduleCategoryList[moduleCodeList.indexOf(newValue)];
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
                options={moduleNameList}
                fullWidth
                defaultValue=""
                value={moduleName}
                onChange={(event, newValue) => {
                  setModuleName(newValue);
                  const correspondingModuleCode = moduleCodeList[moduleNameList.indexOf(newValue)];
                  setModuleCode(correspondingModuleCode);
                  console.log(correspondingModuleCode);
                  const correspondingModuleMC = moduleMCList[moduleNameList.indexOf(newValue)];
                  setModuleMC(correspondingModuleMC);
                  console.log(correspondingModuleMC);
                  const correspondingModuleCategory = moduleCategoryList[moduleNameList.indexOf(newValue)];
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
    </div>
  );
}

export default ButtonDialog