import '../index.css';
import '../styles/Signup.css';
import { Helmet } from 'react-helmet';
import { Stack, Grid } from '@mui/material';
import Signup_Form from "../components/Signup_Form"
import signup_image from '../graphics/signup_image.png';

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
          <Signup_Form />
          <img src={signup_image} alt="Logo" width="500px" />
        </Stack>
      </Grid>
    </>
  )
}

export default Signup