import React, {useState} from 'react';
import api from '../Services/UserService';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "name"){
            setName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }


    const handleSubmit  = async (e) => {
        // console.log(Name,email,password,confirmPassword);
        e.preventDefault()

        if(password.length < 5){
            alert('Password too short');
        }

        if(password != confirmPassword){
            alert('Passwords do not match');
        }

        try{
            
            const res = await api.post('/auth/register', {
                name: Name,
                email: email,
                password: password,
                password_confirmation: confirmPassword
            });

            navigate('/');
    
    
    }catch(error){
            alert();
    }
        
        


        
    }

    return(
      <form>
          <div className="border-2 w-96 px-5 py-8 rounded mt-10 bg-[#F3F4F6] h-[475px] bg-transparent text-white">
              <div className="">
                  <label className="text-md font-bold" htmlFor="name">Name </label>
                  <input className="block w-full text-black h-10 px-2 rounded text-black" type="text" required value={Name} onChange = {(e) => handleInputChange(e)} id="name" placeholder="Name"/>
              </div>
              <div className="my-5">
                  <label className="text-md font-bold" htmlFor="email">Email </label>
                  <input  type="email" required value={email} onChange = {(e) => handleInputChange(e)} id="email" className="block w-full text-black h-10 px-2 rounded" pattern="^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$" placeholder="Email"/>
              </div>
              <div className="my-5">
                  <label className="text-md font-bold" htmlFor="password">Password </label>
                  <input className="block text-black w-full h-10 px-2 rounded" type="password" required value={password} onChange = {(e) => handleInputChange(e)}  id="password" placeholder="Password"/>
              </div>
              <div className="my-5">
                  <label className="text-md font-bold" htmlFor="confirmPassword">Confirm Password </label>
                  <input className="block text-black w-full h-10 px-2 rounded" type="password" required value={confirmPassword} onChange = {(e) => handleInputChange(e)} id="confirmPassword" placeholder="Confirm Password"/>
              </div>
              <div className="footer">
                <button onClick={(e)=>handleSubmit(e)} type="submit" className=" text-white px-5 py-2 rounded-lg w-1/2 my-2 border-2 hover:bg-white hover:text-black duration-300">Register</button>
            </div>
          </div>
          
      </form>      
    )       
}
export default RegistrationForm;