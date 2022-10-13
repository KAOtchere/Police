import LoginForm from '../Components/LogForm.component';
import api from '../Services/UserService';



function Login() {
    return (
      <div className="flex justify-center bg-blue-700 h-screen">
        <LoginForm/>
      </div>
    );
  }
  
  export default Login;