// styles

// components / pages / images

// tools
import { Button } from '@mui/material';

const Text_Button = ( main_color, hover_color, value, onClickAction ) => 
  <Button 
    variant="text" 
    sx={{ 
      color: main_color, 
      fontWeight: "bold", 
      ':hover': {
        bgcolor: hover_color,
    }, }} 
    onClick={onClickAction}>
      {value}
  </Button>

const Contained_Button = ( main_color, value, onClickAction ) =>
  <Button 
    variant="contained" 
    sx={{ bgcolor: main_color, fontWeight: "bold" }} 
    onClick={onClickAction}>
      {value}
  </Button>

const MainButton = ({ type, main_color, hover_color, value, onClickAction }) => {
  return type === "contained"
    ? Contained_Button(main_color, value, onClickAction)
    : Text_Button(main_color, hover_color, value, onClickAction);
}

export default MainButton