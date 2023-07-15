// styles

// components / pages / images
import MainButton from '../common/MainButton';

// tools
import * as React from 'react';
import {
  Typography, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  Stack
} from '@mui/material'

const DeleteAccountDialog = ({ button_text, header, text, deleteAccount }) => {
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = React.useState(false);

  const handleOpenDeleteAccountDialog = () => {
    setOpenDeleteAccountDialog(true);
  };

  const handleCloseDeleteAccountDialog = () => {
    setOpenDeleteAccountDialog(false);
  };

  const handleDeleteAccount = () => {
    setOpenDeleteAccountDialog(false);
    deleteAccount();
  }

  return (
    <div>
      <MainButton
        type="text"
        main_color="red.main"
        hover_color="red.light"
        value={button_text}
        onClickAction={handleOpenDeleteAccountDialog}
      />
      <Dialog open={openDeleteAccountDialog} onClose={handleCloseDeleteAccountDialog}>
        <Stack padding="24px">
          <DialogTitle>
            <Typography variant="h3" color="black.main">{header}</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="body_thin" color="black.main">{text}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MainButton
              type="text"
              main_color="dark_gray.main"
              hover_color="off_white.main"
              value="CANCEL"
              onClickAction={handleCloseDeleteAccountDialog}
            />
            <MainButton
              type="text"
              main_color="red.main"
              hover_color="red.light"
              value="DELETE ACCOUNT"
              onClickAction={handleDeleteAccount}
            />
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
}

export default DeleteAccountDialog