import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'



//all this block of code will make my website look interactive , so when a user 
//does't have a login acount they will just have the option to click on register and the 
//the page will redirect them to the register form.

//we pass the properties from the parent components to our homepage function so they can manage the login and register process 
const HomePage = ({ onLogin, onRegister }) => {
//this state will track whether the registerForm should be shown 
//setting to false means that login form is show by default
    const [showRegister, setShowRegister] = useState(false)

// we have to create this functions so the onRegister and onLogin properties can be define and process correctly 

    const handleLogin = (user) => {
      console.log('User logged in:', user);
    };

    const handleRegister = (user) => {
      console.log('User register in:', user);
    };


  return (
    <>
    
    {showRegister ?
    <> 
    <RegisterForm onRegister={ handleRegister }/> 
    <button onClick={() => setShowRegister(false)}>Need to Login?</button>
    </>
    :
    <>
    <LoginForm onLogin={ handleLogin }/>
    <button onClick={() => setShowRegister(true)}>Need to Register?</button>
    </>
    }
    
    </>
  )
}

export default HomePage