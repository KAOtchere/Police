import React, {useState} from 'react';
import api from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import {setCookie} from '../Services/CookieFuncs';
// import './style.css'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    }

    const handleSubmit  = async (e) => {
        // console.log(Name,email,password,confirmPassword);
        e.preventDefault()

        

        

        try{
            
            const res = await api.post('/auth/login', {
                email: email,
                password: password,
            });
            setCookie('token', res.data.token)
            window.location.reload()
    
    
    }catch(error){
        
    }
        
        


        
    }

    return(
      <div className="form">
          <div className="form-body">
              <div className="email">
                  <label className="form__label" htmlFor="email">Email </label>
                  <input  type="email" required value={email} onChange = {(e) => handleInputChange(e)} id="email" className="form__input" placeholder="Email"/>
              </div>
              <div className="password">
                  <label className="form__label" htmlFor="password">Password </label>
                  <input className="form__input" type="password" required value={password} onChange = {(e) => handleInputChange(e)}  id="password" placeholder="Password"/>
              </div>
              
          </div>
          <div className="footer">
              <button onClick={(e)=>handleSubmit(e)} type="submit" className="btn">Login</button>
          </div>


      </div>      
    )       
}
export default LoginForm;