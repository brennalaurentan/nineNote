import Form_Field from './Form_Field';
import Main_Button from './Main_Button';
import { Stack, Link } from '@mui/material';

const Form = () => {
  return (
    <>
        <div className="ninenote-logo">nineNote</div>  
        <div className='login-intro'>
          <h2>Log In</h2>
          <div className='signup-desc'>
              <div className="tag-thin">New user?</div>
              <a className="tag-thin" href="/signup">Create an account</a>
          </div>
        </div>
        <Stack spacing={3} width={500}>
            <Form_Field field_name={"Email Address"} type={"normal"}/>
            <Form_Field field_name={"Password"} type={"password"}/>
        </Stack>
        <div className='forgot-password'>
            <a className="tag-thin" href="/signup">Forgot your password?</a>
        </div>
       <Link href="/graduation-progress-tracker"><Main_Button value="LOG IN"/></Link>
    </>
  )
}

export default Form