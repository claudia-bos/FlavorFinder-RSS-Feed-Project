import React, { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
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
    <>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          
        </>
      ) : (
        <>
          {showRegister ? (
            <>
              <RegisterForm onRegister={handleRegister} />
              <button onClick={() => setShowRegister(false)}>Need to Login?</button>
            </>
          ) : (
            <>
              <LoginForm onLogin={handleLogin} />
              <button onClick={() => setShowRegister(true)}>Need to Register?</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;