import { Button } from '@mui/material';

const Normal_Button = ({ value }) => {
  return (
    <Button variant="contained" color="blue">
      {value}
    </Button>
  )
}

const OnClickAction_Button = ({ value, onClickAction }) => {
  return (
    <Button variant="contained" color="blue" onClick={onClickAction}>
      {value}
    </Button>
  )
}

/*
const Main_Button = ({ value, type, onClickAction}) => {
  return type == "login"
    ? Login_Button(value, onClickAction)
    : Normal_Button(value);
}
*/

//export default Main_Button

export default OnClickAction_Button