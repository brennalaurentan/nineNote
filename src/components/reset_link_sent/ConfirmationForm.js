// styles

// components / pages / images
import MainButton from '../common/MainButton';
import ninenote_blue from '../../graphics/ninenote_blue.png';

// tools
import { Grid, Box, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ConfirmationForm = () => {
    const navigate = useNavigate();

    async function ReturnToLogin() {
        try {
            navigate('/');
        } catch (error) {
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
                        <Typography variant="h2" textAlign="center">Reset Link Sent!</Typography>
                        <Typography variant="body_thin" textAlign="center">
                            We have sent a password reset link to your email. Once you have updated your
                            new password, you may login again by clicking the button below.
                        </Typography>
                        <MainButton
                            type="contained"
                            main_color="blue.main"
                            value="PROCEED TO LOG IN"
                            onClickAction={ReturnToLogin}
                        />
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default ConfirmationForm