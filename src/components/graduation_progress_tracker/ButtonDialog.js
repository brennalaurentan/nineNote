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
import { query, collection, where, setDoc, getDoc, doc } from 'firebase/firestore';

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

  const handleAdd = () => {
    setOpen(false);
    try {
      // log data for checking
      console.log(moduleCode);
      console.log(moduleName);
      console.log(moduleMC);
      // add data to firestore
      const usersCollectionRef = collection(db, 'users');
      const auth = getAuth();
      const user = auth.currentUser;
      const currentUserEmail = user.email;
      console.log("Current user email is: " + currentUserEmail);
      //const q = query(usersRef, where('email', '==', currentUserEmail));
      // obtain user's id for access in the firebase
      //const userID = getDocs(q).then((qSnap) => {
        //const data = qSnap.docs.id;
      //})
      //console.log(q);
      const newModule = {
        email: currentUserEmail,
        moduleCode: moduleCode,
        moduleName: moduleName,
        moduleMC: moduleMC
      };
      // go to document with userID found earlier
      const userRef = doc(usersCollectionRef, currentUserEmail);
      //const userRef = db.collection('users').doc(currentUserEmail);
      //const moduleCollectionRef = collection(usersCollectionRef, currentUserEmail + "/modules");
      // push new module data onto firestore
      setDoc(userRef, newModule);
      //setDoc(moduleCollectionRef, newModule);
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