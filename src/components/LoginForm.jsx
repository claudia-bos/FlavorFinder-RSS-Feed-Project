import React, { useState } from 'react'

//the onlogin is like a helper that tells the website what to do when the log in button is cliked
const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  //i create a function handleSubmit so my values can be updated, (e) stands for event
  //after all this is set up i create a async function, and this function will run when the log in button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password }
      onLogin(user)
    } catch (error) {
        console.log('Error logging in:', error)
    }
  };


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
            name="email"
            required
            />

            <label htmlFor="password">Password:</label>
            <input 
            value={pass} 
            onChange={(e) => setPass(e.target.value)}
            type="password" 
            placeholder="********" 
            id="password" 
            name="password"
            required
            />

            <button type='submit'>Log in</button>
         </form>

      </div>
        
        {/* <button>Don't have an account? Register here</button> */}
    
    </>
  )
}

export default LoginForm