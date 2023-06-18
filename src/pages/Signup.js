// styles
import '../index.css';
import '../styles/Signup.css';

// components / pages / images
import Layout from '../components/others/Layout';
import SignupForm from "../components/signup/SignupForm"
import signup_image from '../graphics/signup_image.png';

// tools
import { Helmet } from 'react-helmet';
import { Box } from '@mui/material';

const Signup = () => {
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
          <SignupForm />
          <Box width={["50vw", "30vw"]}>
            <img src={signup_image} alt="Logo" width="100%" />
          </Box>
        </Box>
      </Layout>
    </>
  )
}

export default Signup