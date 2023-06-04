import { Button } from '@mui/material';

const Text_Button = ( value ) => 
  <Button variant="text">{value}</Button>

const Contained_Button = ( value, onClickAction ) =>
  <Button variant="contained" onClick={onClickAction}>{value}</Button>

const Main_Button = ({ type, value, onClickAction }) => {
  return type === "contained"
    ? Contained_Button(value, onClickAction)
    : Text_Button(value);
}

export default Main_Button