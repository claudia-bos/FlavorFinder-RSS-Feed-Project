import React, { useState } from 'react'
import './RegisterForm.css'

//so onRegister will be call inside my RegisterForm function,this is called destructuring
//it means that my function is expecting to receive an object with a property onRegister
//onRegister will be call when the user submits their email,name and password 
const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')


  //i create a function handleSubmit so my values can be updated, (e) stands for event
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

      console.log('Registering with:', { name, email, password});

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password })
      })

      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('isAuthenticated', JSON.stringify(true))
        onRegister(true)
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (error) {
      console.log('Error registering:', error);
      setError('Error registering')
    }

  // try {
    //   const user = { name, email, password}
    //   onRegister(user)
    // } catch (error) {
    //   console.log('Error registering', error)
    // }
  };


  return (
    <>
    <div className='container '>
      <div className='register-container'>
        <form className='register-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Full Name:</label>
          <input 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          type='name' 
          name='name' 
          id='name' 
          placeholder='write name here'
          required
          />
          <br/>
          <label htmlFor='email'>Email:</label>
          <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type='email' 
          name='email' 
          id='email' 
          placeholder='youremail@gmail.com' 
          required
          />
          <br/>
          <label htmlFor='password'>Password:</label>
          <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          type='password' 
          name='password' 
          id='password' 
          placeholder='*********'
          required
          />
          <br/>
          <button className='login-button' type='submit'>Log in</button>
        </form>
      </div>      
    </div>
    </>
  )
}

export default RegisterForm;