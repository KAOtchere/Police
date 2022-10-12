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
          <div className="form-body">
              <div className="name">
                  <label className="form__label" htmlFor="name">Name </label>
                  <input className="form__input" type="text" required value={Name} onChange = {(e) => handleInputChange(e)} id="name" placeholder="Name"/>
              </div>
              <div className="email">
                  <label className="form__label" htmlFor="email">Email </label>
                  <input  type="email" required value={email} onChange = {(e) => handleInputChange(e)} id="email" className="form__input" pattern="^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$" placeholder="Email"/>
              </div>
              <div className="password">
                  <label className="form__label" htmlFor="password">Password </label>
                  <input className="form__input" type="password" required value={password} onChange = {(e) => handleInputChange(e)}  id="password" placeholder="Password"/>
              </div>
              <div className="confirm-password">
                  <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                  <input className="form__input" type="password" required value={confirmPassword} onChange = {(e) => handleInputChange(e)} id="confirmPassword" placeholder="Confirm Password"/>
              </div>
          </div>
          <div className="footer">
              <button onClick={(e)=>handleSubmit(e)} type="submit" className="btn">Register</button>
          </div>
      </form>      
    )       
}
export default RegistrationForm;