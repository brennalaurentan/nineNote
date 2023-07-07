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

const ButtonDialog = ({ button_text, header, text, onSubmit, yearSem }) => {
  // for testing
  const moduleList = [
    {
      moduleCode: 'CS1101S',
      moduleName: 'Programming Methodology I',
      moduleMC: '4',
    },
    {
      moduleCode: 'CS1231S',
      moduleName: 'Discrete Structures',
      moduleMC: '5',
    },
    {
      moduleCode: 'GEA1000',
      moduleName: 'Quantitative Reasoning with Data',
      moduleMC: '6',
    },
    {
      moduleCode: 'MA1521',
      moduleName: 'Calculus for Computing',
      moduleMC: '7',
    },
  ];

  const moduleCodeList = moduleList.map(module => module.moduleCode);
  const moduleNameList = moduleList.map(module => module.moduleName);
  const moduleMCList = moduleList.map(module => module.moduleMC);

  const [open, setOpen] = React.useState(false);
  const [moduleCode, setModuleCode] = React.useState("");
  const [moduleName, setModuleName] = React.useState("");
  const [moduleMC, setModuleMC] = React.useState(0);
  const yearSemCode = yearSem.replace(/ /g, '');

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

      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      const queryData = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        id: detail.id,
      }));
      console.log(queryData);
      queryData.map(async (v, id) => {
        let docCount = 0;
        const querySnapshot = await getDocs(collection(db, `users/${currentUserEmail}/modules/`));
        // for each semester
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          // retrieve numModules count in the correct semester
          // (according to button pressed)
          if (doc.id === yearSemCode) {
            docCount = doc.data().numModules;
          }
        });

        // obtain index of next module to add
        const docNextIndex = docCount + 1;

        // create new collection with new module details
        await setDoc(doc(db, `users/${currentUserEmail}/modules/${yearSemCode}/module_${docNextIndex}`, 'moduleDetails'), {
          moduleID: v4(),
          moduleCode: moduleCode,
          moduleName: moduleName,
          moduleMC: moduleMC,
          moduleCategory: "P"
        });

        // update numModules property (field) in firestore
        await setDoc(doc(db, `users/${currentUserEmail}/modules`, yearSemCode), {
          numModules: docNextIndex
        });

        // // updated prpgress rings
        // moduleGroupsArray.forEach((moduleGroup) => {
        //   if (moduleCategory = moduleGroup.moduleCategory) {

        //   }
        // })
      })
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