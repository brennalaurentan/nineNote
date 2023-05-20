import Form_Field from './Form_Field';
import Main_Button from './Main_Button';
import { Stack, Link, Typography } from '@mui/material';

const Form = () => {
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
        <Form_Field field_name={"Email Address"} type={"normal"} />
        <Form_Field field_name={"Password"} type={"password"} />
        <Link underline="none">
          <Typography variant="tag_thin" display="flex" justifyContent="flex-end">Forgot your password?</Typography> 
        </Link>
        <Link href="/graduation-progress-tracker"><Main_Button value="LOG IN" /></Link>
      </Stack>
    </>
  )
}

export default Form