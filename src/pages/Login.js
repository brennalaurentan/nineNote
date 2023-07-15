// styles
import '../index.css';
import '../styles/Login.css';

// components / pages / images
import Layout from '../components/others/Layout';
import LoginForm from '../components/login/LoginForm';
import login_image from '../graphics/login_image.png';

// tools
import { Helmet } from 'react-helmet';
import { Box } from '@mui/material';


const Login = ({ setOpenLoginToGPTSnackBar }) => {
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
          <LoginForm setOpenLoginToGPTSnackBar={setOpenLoginToGPTSnackBar}/>
          <Box width={["50vw", "30vw"]}>
            <img src={login_image} alt="Logo" width="100%" />
          </Box>
        </Box>
      </Layout>
    </>
  )
}

export default Login