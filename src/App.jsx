import React, { useEffect, useState } from 'react';
import './App.css'
import { Link, Outlet } from 'react-router-dom';
import Header from './components/Header';





function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem('isAuthenticated')) || false
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))
  }, [isAuthenticated])


  return (
    <>
      <Header isAuthenticated={isAuthenticated}/>
      <Outlet context={[isAuthenticated, setIsAuthenticated]}/>
    </>
  )
}

export default App;