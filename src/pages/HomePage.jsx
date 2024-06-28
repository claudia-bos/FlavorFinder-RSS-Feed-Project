import React, { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import food from '../assets/food.jpg'
import axios from 'axios'

//all this block of code will make my website look interactive , so when a user 
//does't have a login acount they will just have the option to click on register and the 
//the page will redirect them to the register form.

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useOutletContext(); // Use the context from Outlet

  console.log('HomePage received setIsAuthenticated:', typeof setIsAuthenticated);

  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/api/session-check');
        if (response.data.success) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();
  }, [setIsAuthenticated]);

  const handleLogin = (user) => {
    console.log('User logged in:', user);
    setIsAuthenticated(true);
    navigate('/find-restaurant-page');
  };

  const handleRegister = (user) => {
    console.log('User registered:', user);
    setIsAuthenticated(true);
    navigate('/find-restaurant-page');
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/logout');
      if (response.data.success) {
        setIsAuthenticated(false);
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${food})` }}>
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${food})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div> */}
     
      <div className="relative z-10 max-w-md w-full bg-opacity-60 bg-gray-800 p-8 rounded-lg shadow-lg">

      {isAuthenticated ? (
        <div className="text-center">
          <button onClick={handleLogout} className="mt-4 rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-hoverGreen focus:outline-none focus:ring-2 focus-visible:outline-customeGreen focus:ring-offset-2">
            Logout
          </button>          
        </div>
      ) : (
        <div>
          <div className='flex flex-col items-center w-full h-full'>
            {showRegister ? (
              <>
                <RegisterForm onRegister={handleRegister} />
                
                <button onClick={() => setShowRegister(false)} className="text-sm text-textColor hover:text-textColor mt-4">Need to Login?</button>
                
              </>
            ) : (
              <>
                <LoginForm onLogin={handleLogin} />
                
                <button onClick={() => setShowRegister(true)} className="text-sm text-textColor hover:text-textColor mt-4">Need to Register?</button>
                
              </>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default HomePage;