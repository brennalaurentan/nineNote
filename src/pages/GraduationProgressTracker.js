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
import { Helmet } from 'react-helmet';
import { Stack } from '@mui/material';

const GraduationProgressTracker = () => {
  let ccr = 8;
  let ccrTotal = 40;
  let pr = 24;
  let prTotal = 80;
  let uer = 0;
  let uerTotal = 40;

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