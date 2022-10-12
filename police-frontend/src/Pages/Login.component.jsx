import Header from '../Components/LogHeader.component';
import LoginForm from '../Components/LogForm.component';
import api from '../Services/UserService';



function Login() {
    return (
      <div className="Login">
        <Header/>
        <LoginForm/>
      </div>
    );
  }
  
  export default Login;