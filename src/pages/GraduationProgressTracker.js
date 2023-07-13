// styles
import '../index.css';

// components / pages / images
import MainNavbar from '../components/common/MainNavbar';
import CreditsSelected from '../components/graduation_progress_tracker/CreditsSelected';
import GraduationStatus from '../components/graduation_progress_tracker/GraduationStatus';
import ModuleExemptions from '../components/graduation_progress_tracker/ModuleExemptions';
import ModulePlanner from '../components/graduation_progress_tracker/ModulePlanner';
import SnackBar from '../components/common/SnackBar';

// tools
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Stack } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../components/others/firebase';
import { useEffect } from 'react';

const GraduationProgressTracker = () => {

  const auth = getAuth();
  const user = auth.currentUser;
  const currentUserEmail = user.email;

  // edits to the variables below will be reflected in the progress rings
  //let ccr = 8;
  let ccrTotal = 40;
  //let pr = 24;
  let prTotal = 80;
  //let uer = 0;
  let uerTotal = 40;

  const [ccr, setCCR] = React.useState();
  const [pr, setPR] = React.useState();
  const [uer, setUER] = React.useState();

  async function retrieveProgressFields() {
    const gradProgressCollectionPath = `users/${currentUserEmail}/gradProgress`;
    const gradProgressCollection = collection(db, gradProgressCollectionPath);
    const gradProgressQuerySnapshot = await getDocs(gradProgressCollection);
    gradProgressQuerySnapshot.forEach((mainModuleGroup) => {
      if (mainModuleGroup.id === "commonCurriculum") {
        setCCR(mainModuleGroup.data().creditsCompleted);
        console.log("ccr is " + ccr);
      }
      else if (mainModuleGroup.id === "programme") {
        setPR(mainModuleGroup.data().creditsCompleted);
        console.log("pr is " + pr);
      }
      else if (mainModuleGroup.id === "unrestrictedElectives") {
        setUER(mainModuleGroup.data().creditsCompleted);
        console.log("uer is " + uer);
      }
    });
  }
  retrieveProgressFields();

  // edits to the variables below will be reflected in the progress bar
  let totalNumerator = ccr + pr + uer;
  let totalDenominator = ccrTotal + prTotal + uerTotal;

    return (
      <>
        <Helmet>
          <title>nineNote | Graduation Progress Tracker</title>
        </Helmet>
        <MainNavbar />
        <SnackBar type="success" text="You have logged in successfully." />
        <Stack direction="row" gap="64px" padding="56px">
          <Stack gap="56px">
            <CreditsSelected
              ccr={ccr}
              ccrTotal={ccrTotal}
              pr={pr}
              prTotal={prTotal}
              uer={uer}
              uerTotal={uerTotal} />
            <GraduationStatus
              numerator={totalNumerator}
              denominator={totalDenominator} />
            <ModuleExemptions />
          </Stack>
          <ModulePlanner />
        </Stack>
      </>
    )
}

export default GraduationProgressTracker