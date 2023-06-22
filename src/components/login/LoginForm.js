// styles

// components / pages / images
import FormField from '../common/FormField';
import MainButton from '../common/MainButton';
import ninenote_blue from '../../graphics/ninenote_blue.png';
import SnackBar from '../graduation_progress_tracker/SnackBar';

// tools
import { Stack, Link, Typography, Box } from '@mui/material';
import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../others/firebase';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();
  async function Login() {
    try {
      console.log(loginEmail);
      console.log(loginPassword);
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate('/graduation-progress-tracker');
      console.log(user);
    } catch (error) {
      console.log(error.message);
      setLoginError(true);
    };
  }

  return (
    <>
      <Stack gap="24px">
        <Box width={["15vw", "5vw"]}>
          <img src={ninenote_blue} alt="Logo" width="100%" />
        </Box>
        <Typography variant="h2">Log In</Typography>
        <Stack direction="row" gap="4px" alignItems="center">
          <Typography variant="tag_thin">New user?</Typography>
          <Link href="/signup" underline="none">
            <Typography variant="tag_thin">Create an account</Typography>
          </Link>
        </Stack>
        <FormField
          field_name={"Email Address"}
          type={"email"}
          onChangeAction={(event) => {
            setLoginEmail(event.target.value);
            console.log("live email update: " + loginEmail);
          }}
        />
        <FormField
          field_name={"Password"}
          type={"password"}
          onChangeAction={(event) => {
            setLoginPassword(event.target.value);
            console.log("live password update: " + loginPassword);
          }}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link>
            <MainButton
              type="contained"
              main_color="blue.main"
              value="LOG IN"
              onClickAction={Login}
            />
          </Link>
          <SnackBar type="error" error={loginError} text="Incorrect credentials. Please try again."/>
          <Link underline="none">
            <Typography variant="tag_thin" display="flex" justifyContent="flex-end">Forgot your password?</Typography>
          </Link>
        </Stack>
      </Stack>
    </>
  )
}

export default LoginForm