// styles

// components / pages / images
import MainButton from '../common/MainButton';
import FormField from '../common/FormField';

// tools
import * as React from 'react';
import {
  Typography, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  Stack
} from '@mui/material'
import { auth, db } from '../others/firebase';
import { getAuth } from 'firebase/auth';
import { query, collection, setDoc, getDocs, getDoc, doc, get } from 'firebase/firestore';

const ButtonDialog = ({ button_text, header, text }) => {
  const [open, setOpen] = React.useState(false);
  const [moduleCode, setModuleCode] = React.useState("");
  const [moduleName, setModuleName] = React.useState("");
  const [moduleMC, setModuleMC] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    setOpen(false);
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
        // const numModulesRef = collection(db, `users/${currentUserEmail}/modules/`).doc('Y1S1');
        // const snapshot = await numModulesRef.get();
        // const count = snapshot.data().numModules;
        // console.log(`num modules: " + ${count}`);
        await setDoc(doc(db, `users/${currentUserEmail}/modules/Y1S1/module_3`, 'moduleDetails'), {
          moduleCode: moduleCode,
          moduleName: moduleName,
          moduleMC: moduleMC
        });
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
              <FormField
                field_name={"Module Code"}
                type={"module"}
                onChangeAction={(event) => {
                  setModuleCode(event.target.value);
                  console.log("live module code update: " + moduleCode);
                }}
              />
              <FormField
                field_name={"Module Name"}
                type={"module"}
                onChangeAction={(event) => {
                  setModuleName(event.target.value);
                  console.log("live module name update: " + moduleName);
                }}
              />
              <FormField
                field_name={"Number of MCs"}
                type={"module"}
                onChangeAction={(event) => {
                  setModuleMC(event.target.value);
                  console.log("live module MC update: " + moduleMC);
                }}
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