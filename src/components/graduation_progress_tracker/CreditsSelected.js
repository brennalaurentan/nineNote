// styles

// components / pages / images
import ProgressBarLabel from './ProgressBarLabel';

// tools
import { Typography, Stack } from '@mui/material';

const CreditsSelected = ({ ccr, ccrTotal, pr, prTotal, uer, uerTotal }) => {
    // const calculateCredits = () => {
    //     let moduleArray = ["CS1231S", "MA1521", "CS2100", "GEA1000", "IS2218"];
    //     let newModuleArray = moduleArray.map(module => module.slice(0, 2));
    //     newModuleArray.map(
    //         firstTwoLetters => firstTwoLetters === "GE"
    //             ? ccr += 4
    //             : firstTwoLetters === "CS" || firstTwoLetters === "MA"
    //                 ? pr += 4
    //                 : uer += 4
    //     )
    //     console.log(newModuleArray);
    //     console.log("Credits for Core Curriculum: ", ccr);
    //     console.log("Credits for Programme: ", pr);
    //     console.log("Credits for Electives: ", uer);
    // }

    return (
        <Stack gap="32px">
            <Typography variant="h3">Credits Selected</Typography>
            <ProgressBarLabel
                type="circular"
                name="Common Curriculum Requirements"
                numerator={ccr}
                denominator={ccrTotal}
            />
            <ProgressBarLabel
                type="circular"
                name="Programme Requirements"
                numerator={pr}
                denominator={prTotal}
            />
            <ProgressBarLabel
                type="circular"
                name="Unrestricted Electives Requirements"
                numerator={uer}
                denominator={uerTotal}
            />
        </Stack>
    )
}

export default CreditsSelected