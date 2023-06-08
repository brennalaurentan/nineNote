import * as React from 'react';
import MainButton from '../components/MainButton';
import FormField from '../components/FormField';
import ModulePill from '../components/ModulePill';
import addItem from '../components/ModulePlanner';
import {
  Typography, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  Stack
} from '@mui/material'

const ButtonDialog = ({ button_text, header, text }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setOpen(false);
  }

  return (
    <div>
      <MainButton type="text" main_color="dark_gray.main" value={button_text} onClickAction={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <Stack padding="24px">
          <DialogTitle>
            <Typography variant="h3" color="black.main">{header}</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="body_thin" color="black.main">{text}</Typography>
            </DialogContentText>
            <Stack gap="16px" marginTop="16px">
              <FormField
                field_name={"Module Code"}
                type={"module"}
              // onChangeAction
              />
              <FormField
                field_name={"Module Name"}
                type={"module"}
              // onChangeAction
              />
              <FormField
                field_name={"Number of MCs"}
                type={"module"}
              // onChangeAction
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <MainButton type="text" main_color="blue.main" value="CANCEL" onClickAction={handleClose} />
            <MainButton type="text" main_color="blue.main" value="ADD" onClickAction={handleAdd} />
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
}

export default ButtonDialog