import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const HomePage = () => {

    const [showRegister, setShowRegister] = useState(false)

  return (
    <>
    
    {showRegister ?
    <> 
    <RegisterForm /> 
    <button onClick={() => setShowRegister(false)}>Need to Login?</button>
    </>
    :
    <>
    <LoginForm/>
    <button onClick={() => setShowRegister(true)}>Need to Register?</button>
    </>
    }
    
    </>
  )
}

export default HomePage