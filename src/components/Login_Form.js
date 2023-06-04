import Form_Field from './Form_Field';
import Main_Button from './Main_Button';
import { Stack, Link, Typography } from '@mui/material';
import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const Form = () => {

  const [loginEmail, setLoginEmail] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);

  const navigate = useNavigate();
  async function Login(){
    try {
      console.log(loginEmail);
      console.log(loginPassword);
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate('/graduation-progress-tracker');
      console.log(user);
    } catch (error) {
      console.log(error.message);
    };
  }

  const logout = async () => {

  };

  return (
    <>
      <Stack gap="16px" width="400px">
        <Typography variant="logo" color="blue.main">nineNote</Typography>
        <Typography variant="h2">Log In</Typography>
        <Stack direction="row" gap="4px" alignItems="center">
          <Typography variant="tag_thin">New user?</Typography>
          <Link href="/signup" underline="none">
            <Typography variant="tag_thin">Create an account</Typography>
          </Link>
        </Stack>
        <Form_Field
          field_name={"Email Address"}
          type={"email"}
          onChangeAction={(event) => {
            setLoginEmail(event.target.value);
            console.log("live email update: " + loginEmail);
          }}
        />
        <Form_Field
          field_name={"Password"}
          type={"password"}
          onChangeAction={(event) => {
            setLoginPassword(event.target.value);
            console.log("live password update: " + loginPassword);
          }}
        />
        <Link underline="none">
          <Typography variant="tag_thin" display="flex" justifyContent="flex-end">Forgot your password?</Typography>
        </Link>
        <Link>
          <Main_Button 
            value="LOG IN"
            type="contained"
            onClickAction={Login}
          />
        </Link>
      </Stack>
    </>
  )
}

export default Form