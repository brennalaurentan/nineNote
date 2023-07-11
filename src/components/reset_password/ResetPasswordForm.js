// styles

// components / pages / images
import MainButton from '../common/MainButton';
import ninenote_blue from '../../graphics/ninenote_blue.png';

// tools
import { useState } from 'react';
import { auth } from '../others/firebase';
import { Grid, Box, Typography, TextField, Stack, Snackbar, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const [resetEmail, setResetEmail] = useState(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    async function ResetPassword() {
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            navigate('/reset-link-sent');
        } catch (error) {
            setOpenSnackBar(true);
            console.log(error.message);
        };
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            height="85vh"
        >
            <Grid item xs={3}>
                <Stack gap="50px" width="400px">
                    <Box display="flex" justifyContent="center">
                        <img src={ninenote_blue} alt="Logo" width="100px" />
                    </Box>
                    <Stack gap="30px">
                        <Typography variant="h2" textAlign="center">Reset Password</Typography>
                        <Typography variant="body_thin">Enter your email and we will send you a link to reset your password.</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                fullWidth
                                id="input-with-sx"
                                label="Email"
                                variant="standard"
                                onChange={(event) => {
                                    setResetEmail(event.target.value);
                                    console.log("live email update: " + event.target.value);
                                }}
                            />
                        </Box>
                        <MainButton
                            type="contained"
                            main_color="blue.main"
                            value="CONTINUE"
                            onClickAction={ResetPassword}
                        />

                        {/* snackbar displays only when there is an error */}
                        <Snackbar
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            open={openSnackBar}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackBar}
                        >
                            <Alert severity="error" sx={{ width: "100%" }}>
                                <Typography variant="tag_thin">
                                    User not found in database. Please try again.
                                </Typography>
                            </Alert>
                        </Snackbar>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default ResetPasswordForm