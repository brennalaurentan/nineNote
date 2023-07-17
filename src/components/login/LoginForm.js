// styles

// components / pages / images
import FormField from '../common/FormField';
import MainButton from '../common/MainButton';
import ninenote_blue from '../../graphics/ninenote_blue.png';

// tools
import { Stack, Link, Typography, Box, Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../others/firebase';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setOpenLoginSuccessSnackBar }) => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);

  // snackbar states
  const [openUserNotFoundSnackBar, setOpenUserNotFoundSnackBar] = useState(false);
  const [openInvalidEmailSnackBar, setOpenInvalidEmailSnackBar] = useState(false);
  const [openMissingEmailSnackBar, setOpenMissingEmailSnackBar] = useState(false);
  const [openMissingPasswordSnackBar, setOpenMissingPasswordSnackBar] = useState(false);
  const [openWrongPasswordSnackBar, setOpenWrongPasswordSnackBar] = useState(false);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenUserNotFoundSnackBar(false);
    setOpenInvalidEmailSnackBar(false);
    setOpenMissingEmailSnackBar(false);
    setOpenMissingPasswordSnackBar(false);
    setOpenWrongPasswordSnackBar(false);
  };

  async function Login() {
    try {
      console.log(loginEmail);
      console.log(loginPassword);
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate('/graduation-progress-tracker');
      setOpenLoginSuccessSnackBar(true);
      console.log(user);
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/user-not-found") {
        setOpenUserNotFoundSnackBar(true);
        console.log("user not found!");
      } else if (error.code === "auth/invalid-email") {
        setOpenInvalidEmailSnackBar(true);
        console.log("invalid email!");
      } else if (error.code === "auth/missing-email") {
        setOpenMissingEmailSnackBar(true);
        console.log("missing email!");
      } else if (error.code === "auth/missing-password") {
        setOpenMissingPasswordSnackBar(true);
        console.log("missing password!");
      } else if (error.code === "auth/wrong-password") {
        setOpenWrongPasswordSnackBar(true);
        console.log("wrong password!");
      }
    };
  }

  // function to enable button click using keyboard enter
  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        Login();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

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
          <Link href="/reset-password" underline="none">
            <Typography variant="tag_thin" display="flex" justifyContent="flex-end">Forgot your password?</Typography>
          </Link>

        </Stack>
      </Stack>

      {/* ERROR SNACKBARS */}
      {/* snackbar displays only when user is not found */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openUserNotFoundSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          <Typography variant="tag_thin">
            User not found in database. Please try again.
          </Typography>
        </Alert>
      </Snackbar>

      {/* snackbar displays only when email is invalid */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openInvalidEmailSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          <Typography variant="tag_thin">
            Invalid email address. Please try again.
          </Typography>
        </Alert>
      </Snackbar>

      {/* snackbar displays only when email is missing */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openMissingEmailSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          <Typography variant="tag_thin">
            Missing email address. Please enter your email address.
          </Typography>
        </Alert>
      </Snackbar>

      {/* snackbar displays only when password is missing */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openMissingPasswordSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          <Typography variant="tag_thin">
            Missing password. Please enter your password.
          </Typography>
        </Alert>
      </Snackbar>

      {/* snackbar displays only when password is wrong */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openWrongPasswordSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          <Typography variant="tag_thin">
            Wrong password. Please try again.
          </Typography>
        </Alert>
      </Snackbar>
    </>
  )
}

export default LoginForm