import '../index.css';
import '../styles/Signup.css';
import Signup_Form from "../components/Signup_Form"
import signup_image from '../graphics/signup_image.png';

const Signup = () => {
  return (
    <div className='signup-section'>
        <div>
          <Signup_Form/>
        </div>
        <div className='signup-image'>
          <img src={signup_image} alt="Logo" width="500px"/>
        </div>
    </div>
  )
}

export default Signup