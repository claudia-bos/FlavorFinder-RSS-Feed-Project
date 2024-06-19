import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

//the onlogin is like a helper that tells the website what to do when the log in button is cliked
const LoginForm = ({ onLogin }) => {
  console.log('LoginForm received onLogin:', typeof onLogin);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [error, setError] = useState('')
  const navigate = useNavigate()

  //i create a function handleSubmit so my values can be updated, (e) stands for event
  //after all this is set up i create a async function, and this function will run when the log in button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('form submitted');

    //new code for the login autentication//
 
      try {
        const response = await axios.post('http://localhost:1997/api/login', {
          email,
          password
        });
         console.log(response.data); 
        
        if (response.status === 200) {
          console.log('Login successful');
          onLogin(response.data.user)
          // setIsAuthenticated(true);
          navigate('/find-restaurant-page'); 
        } else {
          console.log('Login failed:', response.data.error);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    
    

    // const bodyObj = {
    //   email: email,
    //   password: password
    // }
    // axios.post('/api/login', bodyObj)
    //   .then((res) => {
    //     console.log(res.data);
    //   })

    // try {
    //   const user = { email, password: password}
    //   onLogin(user)
    // } catch (error) {
    //     console.log('Error logging in:', error)
    // }

    // try {
    //   console.log('sending request with:', {email, password});
      
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    //   });

    //   const data = await response.json();
      
    //   if (response.ok) {
    //     localStorage.setItem('isAuthenticated', JSON.stringify(true))
    //     onLogin(true);
    //   } else {
    //     setError(data.message || 'Loging failed')
    //     onLogin(false);
    //   }
    // } catch (error) {
    //   console.log('Error logging in:', error);
    //   setError('Error logging in')
    // }
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
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            type="password" 
            placeholder="********" 
            id="password" 
            name="password"
            required
            />

            <button type='submit'>Log in</button>
         </form>

      </div>
    
    </>
  )
}

export default LoginForm