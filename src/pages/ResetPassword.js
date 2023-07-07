// styles
import '../index.css';

// components / pages / images
import Layout from '../components/others/Layout';
import MainButton from '../components/common/MainButton';
import ninenote_blue from '../graphics/ninenote_blue.png';

// tools
import { Helmet } from 'react-helmet';
import { Grid, Box, Typography, TextField, Stack, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const ResetPassword = () => {
    return (
        <>
            <Helmet>
                <title>nineNote | Reset Password</title>
            </Helmet>

            <Layout>
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
                                    <TextField fullWidth id="input-with-sx" label="Email" variant="standard" />
                                </Box>
                                <MainButton
                                    type="contained"
                                    main_color="blue.main"
                                    value="CONTINUE"
                                // onClickAction={xxx}
                                />
                            </Stack>
                            <Stack direction="row" gap="4px" alignItems="center" justifyContent="center">
                                <Typography variant="tag_thin">New user?</Typography>
                                <Link href="/signup" underline="none">
                                    <Typography variant="tag_thin">Create an account</Typography>
                                </Link>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Layout>
        </>
    )
}

export default ResetPassword