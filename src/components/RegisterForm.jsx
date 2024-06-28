import React, { useState } from 'react'
// import './RegisterForm.css'

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
      <div className="  w-full flex flex-col items-center w-full px-4 pt-7">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-0 text-center text-3xl lg:font-extrabold text-textColor animate-pulse">Register Here</h2>
          </div>
          <form className="mt-8 space-y-6 w-full" onSubmit={handleSubmit}>
            <div className="bg-box bg-opacity-9 py-8 px-4 shadow sm:rounded-lg sm:px-10 w-full">

                <div>
                  <label htmlFor='name' className="block text-sm font-medium leading-6 text-textColor">Username:</label>
                    <div className="mt-1">
                      <input 
                      value={name}
                      onChange={(e) => setName(e.target.value)} 
                      type='name' 
                      name='name' 
                      id='name' 
                      placeholder='write name here'
                      required
                      className="block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 bg-opacity-30 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"    
                      />
                    </div>
                </div>
              
                <div>
                  <label htmlFor='email' className="block text-sm font-medium leading-6 text-textColor">Email:</label>
                    <div className="mt-1">
                      <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type='email' 
                        name='email' 
                        id='email' 
                        placeholder='youremail@gmail.com' 
                        required
                        className="block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 bg-opacity-30 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"    
                      />
                    </div>
                </div>
                
                <div>
                  <label htmlFor='password'className="block text-sm font-medium leading-6 text-textColor">Password:</label>
                    <div className="mt-1">
                      <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        type='password' 
                        name='password' 
                        id='password' 
                        placeholder='*********'
                        required
                        className="block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 bg-opacity-30 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"    
                      />
                    </div>
                </div>
            </div>

            <div>
             <button className="flex w-full justify-center rounded-md bg-customGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hoverGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customeGreen" type='submit'>Log in</button>
            </div>

          </form>    
        </div>      
      </div>
    </>
  )
}

export default RegisterForm;