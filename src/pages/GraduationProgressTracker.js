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
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Stack, Snackbar, Alert, Typography } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../components/others/firebase';

const GraduationProgressTracker = ({ openLoginSuccessSnackBar, setOpenLoginSuccessSnackBar }) => {
  // handles currently signed-in user
  const [user, setUser] = useState({});

  // function to get the currently signed-in user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [])

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenLoginSuccessSnackBar(false);
  };

  // edits to the variables below will be reflected in the progress rings
  let ccrTotal = 40;
  let prTotal = 80;
  let uerTotal = 40;

  const [ccr, setCCR] = useState(0);
  const [pr, setPR] = useState(0);
  const [uer, setUER] = useState(0);

  async function retrieveProgressFields() {
    const gradProgressCollectionPath = `users/${user.email}/gradProgress`;
    const gradProgressCollection = collection(db, gradProgressCollectionPath);
    const gradProgressQuerySnapshot = await getDocs(gradProgressCollection);
    gradProgressQuerySnapshot.forEach((mainModuleGroup) => {
      if (mainModuleGroup.id === "commonCurriculum") {
        const ccrCreditsCompleted = mainModuleGroup.data().creditsCompleted;
        ccrCreditsCompleted > ccrTotal
          ? setCCR(ccrTotal)
          : setCCR(ccrCreditsCompleted);
        console.log("ccr is " + ccr);
      }
      else if (mainModuleGroup.id === "programme") {
        const prCreditsCompleted = mainModuleGroup.data().creditsCompleted;
        prCreditsCompleted > prTotal
          ? setPR(prTotal)
          : setPR(prCreditsCompleted);
        console.log("pr is " + pr);
      }
      else if (mainModuleGroup.id === "unrestrictedElectives") {
        const uerCreditsCompleted = mainModuleGroup.data().creditsCompleted;
        uerCreditsCompleted > uerTotal
          ? setUER(uerTotal)
          : setUER(uerCreditsCompleted);
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
          <ModuleExemptions retrieveProgressFields={retrieveProgressFields}/>
        </Stack>
        <ModulePlanner retrieveProgressFields={retrieveProgressFields}/>
      </Stack>

      {/* SUCCESS SNACKBAR */}
      {/* snackbar displays only when user enters graduation progress tracker from login */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openLoginSuccessSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography variant="tag_thin">
            Logged in successfully.
          </Typography>
        </Alert>
      </Snackbar>
    </>
  )
}

export default GraduationProgressTracker