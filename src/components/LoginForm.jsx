import React, { useState } from 'react'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  //i create a function handleSubmit so my values can be updated, (e) stands for event
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email)

  }


  return (
    <>
        {/* here i will connect my handleSubmit with my form */}
      <div className='home-page-form'>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder="youremail@gmail.com" 
            id="email" 
            name="email"/>

            <label htmlFor="password">Password:</label>
            <input 
            value={pass} 
            onChange={(e) => setPass(e.target.value)}
            type="password" 
            placeholder="********" 
            id="password" 
            name="password"/>

            <button type='submit'>Log in</button>
         </form>

      </div>
        
        {/* <button>Don't have an account? Register here</button> */}
    
    </>
  )
}

export default LoginForm