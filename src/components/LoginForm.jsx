import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import './LoginForm.css'

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
    
    }
  return (
    <>
        {/* here i will connect my handleSubmit with my form */}
      <div className="  w-full flex flex-col items-center w-full px-4 pt-7">    
        <div className="max-w-md w-full space-y-9">
          <div> 
             <h2 className="mt-3 text-center text-3xl lg:font-extrabold text-textColor animate-pulse">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6 w-full" action="#" method="POST" onSubmit={handleSubmit}>
            <div className="bg-box bg-opacity-9 py-8 px-4 shadow sm:rounded-lg sm:px-10 w-full">

              <div>
               <label htmlFor="email" className="block text-sm font-medium leading-6 text-textColor">Email:</label>
                <div className="mt-1" >
                  <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="youremail@gmail.com" 
                    required
                    className="block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 bg-opacity-30 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"    
                  />
                </div>              
              </div>

              <div>            
                <label htmlFor="password" className=" mt-2 block text-sm font-medium text-textColor">Password:</label>
                  <div  className="mt-1">
                   <input 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      type="password" 
                      id="password" 
                      name="password"
                      placeholder="********" 
                      required
                      className="block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 bg-opacity-30 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"    
                  />
                  </div>           
              </div>
            </div>

             <div>         
               <button className="flex w-full justify-center rounded-md bg-customGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hoverGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customGreen" type='submit'>Log in</button>
             </div>
          </form>                       
        </div>
      </div>
      
    </>
  )
}

export default LoginForm