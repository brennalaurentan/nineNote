import * as React from 'react';
import MainButton from '../components/MainButton';
import FormField from '../components/FormField';
import {
  Typography, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle
} from '@mui/material'

const ButtonDialog = ({ button_text, header, text }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MainButton type="text" main_color="dark_gray.main" value={button_text} onClickAction={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h3" color="black.main">{header}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body_thin" color="black.main">{text}</Typography>
          </DialogContentText>
          <FormField
            field_name={"Module Code"}
            type={"module"}
            // onChangeAction
          />
        </DialogContent>
        <DialogActions>
          <MainButton type="text" main_color="blue.main" value="CANCEL" onClickAction={handleClose} />
          <MainButton type="text" main_color="blue.main" value="ADD" onClickAction={handleClose} />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ButtonDialog