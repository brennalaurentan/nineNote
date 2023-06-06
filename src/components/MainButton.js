import { Button } from '@mui/material';

const Text_Button = ( main_color, value ) => 
  <Button variant="text" sx={{ color: main_color, fontWeight: "bold" }}>{value}</Button>

const Contained_Button = ( main_color, value, onClickAction ) =>
  <Button variant="contained" sx={{ bgcolor: main_color, fontWeight: "bold" }} onClick={onClickAction}>{value}</Button>

const MainButton = ({ type, main_color, value, onClickAction }) => {
  return type === "contained"
    ? Contained_Button(main_color, value, onClickAction)
    : Text_Button(main_color, value);
}

export default MainButton