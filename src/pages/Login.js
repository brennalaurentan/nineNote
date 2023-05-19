import '../index.css';
import '../styles/Login.css';
import { Helmet } from 'react-helmet';
import Login_Form from "../components/Login_Form";
import login_image from '../graphics/login_image.png';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Welcome to nineNote!</title>
      </Helmet>
      <div className='login-section'>
          <div>
            <Login_Form/>
          </div>
          <div className='login-image'>
            <img src={login_image} alt="Logo" width="500px"/>
          </div>
      </div>
    </>
  )
}

export default Login