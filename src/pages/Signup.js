// styles
import '../index.css';
import '../styles/Signup.css';

// components / pages / images
import SignupForm from "../components/signup/SignupForm"
import signup_image from '../graphics/signup_image.png';

// tools
import { Helmet } from 'react-helmet';
import { Stack, Grid } from '@mui/material';

const Signup = () => {
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
          <SignupForm />
          <img src={signup_image} alt="Logo" width="500px" />
        </Stack>
      </Grid>
    </>
  )
}

export default Signup