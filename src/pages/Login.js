import '../index.css';
import '../styles/Login.css';
import { Helmet } from 'react-helmet';
import { Stack, Grid } from '@mui/material';
import Login_Form from "../components/Login_Form";
import login_image from '../graphics/login_image.png';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Welcome to nineNote!</title>
      </Helmet>
      <Grid
        container
        columnSpacing="10px"
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Stack direction="row" gap="256px">
          <Login_Form />
          <img src={login_image} alt="Logo" width="500px" />
        </Stack>
      </Grid>
    </>
  )
}

export default Login