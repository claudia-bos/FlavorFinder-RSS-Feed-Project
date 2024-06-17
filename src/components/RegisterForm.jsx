import React, { useState } from 'react'

//so onRegister will be call inside my RegisterForm function,this is called destructuring
//it means that my function is expecting to receive an object with a property onRegister
//onRegister will be call when the user submits their email,name and password 
const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')


  //i create a function handleSubmit so my values can be updated, (e) stands for event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { name, email, password}
      onRegister(user)
    } catch (error) {
      console.log('Error logging in', error)
    }
  };


  return (
    <>
    <div className='home-page-form'>

        <form onSubmit={handleSubmit}>
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

          <button type='submit'>Log in</button>
        </form>
      
    </div>
    </>
  )
}

export default RegisterForm;