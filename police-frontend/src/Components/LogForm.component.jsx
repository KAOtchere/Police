import React, {useState} from 'react';
import api from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import {setCookie} from '../Services/CookieFuncs';
import LogHeader from './LogHeader.component'
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
      <div className="border-2 w-96 px-5 py-8 rounded mt-10 bg-[#F3F4F6] h-96 bg-transparent text-white">
        <LogHeader />
          <div className="form-body">
              <div className="my-5">
                  <label className="text-md font-bold" htmlFor="email">Email </label>
                  <input  type="email" required value={email} onChange = {(e) => handleInputChange(e)} id="email" className="block w-full h-10 px-2 rounded text-black" placeholder="Email"/>
              </div>
              <div className="password">
                  <label className="text-md font-bold" htmlFor="password">Password </label>
                  <input className="block w-full text-black h-10 px-2 rounded" type="password" required value={password} onChange = {(e) => handleInputChange(e)}  id="password" placeholder="Password"/>
              </div>
              
          </div>
          <div className="footer mt-5">
              <button onClick={(e)=>handleSubmit(e)} type="submit" className=" text-white px-5 py-2 rounded-lg w-1/2 my-2 border-2 hover:bg-white hover:text-black duration-300">Login</button>
          </div>
      </div>      
    )       
}
export default LoginForm;