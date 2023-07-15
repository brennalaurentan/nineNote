// styles
import '../index.css';
import '../styles/Login.css';

// components / pages / images
import Layout from '../components/others/Layout';
import LoginForm from '../components/login/LoginForm';
import login_image from '../graphics/login_image.png';

// tools
import { Helmet } from 'react-helmet';
import { Box, Snackbar, Alert, Typography } from '@mui/material';


const Login = ({ setOpenLoginSuccessSnackBar, openDeleteAccountSnackBar, setOpenDeleteAccountSnackBar }) => {
  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenDeleteAccountSnackBar(false);
  };

  return (
    <>
      <Helmet>
        <title>Welcome to nineNote!</title>
      </Helmet>

      <Layout>
        <Box
          display="flex"
          flexDirection={["column-reverse", "row"]}
          justifyContent="center"
          alignItems="center"
          height="85vh"
          gap={["50px", "300px"]}
        >
          <LoginForm setOpenLoginSuccessSnackBar={setOpenLoginSuccessSnackBar} />
          <Box width={["50vw", "30vw"]}>
            <img src={login_image} alt="Logo" width="100%" />
          </Box>
        </Box>
      </Layout>

      {/* SUCCESS SNACKBAR */}
      {/* snackbar displays only when user deletes account */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openDeleteAccountSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography variant="tag_thin">
            Account successfully deleted.
          </Typography>
        </Alert>
      </Snackbar>
    </>
  )
}

export default Login