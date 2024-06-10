import React, { useState } from 'react'


const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')


  //i create a function handleSubmit so my values can be updated, (e) stands for event
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('registering to flavorfinder with', email, name, pass)
  }


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
          />

          <label htmlFor='email'>Email:</label>
          <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type='email' 
          name='email' 
          id='email' 
          placeholder='youremail@gmail.com' 
          />

          <label htmlFor='password'>Password:</label>
          <input 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
          type='password' 
          name='password' 
          id='password' 
          placeholder='*********'
          />

          <button type='submit'>Log in</button>
        </form>
      
    </div>
    </>
  )
}

export default RegisterForm;