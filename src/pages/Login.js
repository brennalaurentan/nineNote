import '../index.css';
import '../styles/Login.css';
import Form from "../components/Form"
import login_image from '../graphics/login_image.png';

const Login = () => {
  return (
    <div className='login-section'>
        <div>
          <Form/>
        </div>
        <div className='login-image'>
          <img src={login_image} alt="Logo" width="500px"/>
        </div>
    </div>
  )
}

export default Login