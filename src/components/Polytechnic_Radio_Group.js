import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';

const Polytechnic_Radio_Group = () => {
    return (
        <FormControl>
            <FormLabel>
                <Typography variant="body_bold" color="blue.dark">Polytechnic Diploma</Typography>
            </FormLabel>
            <RadioGroup defaultValue="None">
                <FormControlLabel value="None" control={<Radio />} label="None"/>
                <FormControlLabel value="Singapore Polytechnic" control={<Radio />} label="Singapore Polytechnic" />
                <FormControlLabel value="Ngee Ann Polytechnic" control={<Radio />} label="Ngee Ann Polytechnic" />
                <FormControlLabel value="Nanyang Polytechnic" control={<Radio />} label="Nanyang Polytechnic" />
                <FormControlLabel value="Temasek Polytechnic" control={<Radio />} label="Temasek Polytechnic" />
                <FormControlLabel value="Republic Polytechnic" control={<Radio />} label="Republic Polytechnic" />
            </RadioGroup>
        </FormControl>
    )
}

export default Polytechnic_Radio_Group