import React, { useEffect, useState } from 'react';
// import './App.css'
import { Link, Outlet } from 'react-router-dom';
import Header from './components/Header';
import './index.css'





function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem('isAuthenticated')) || false
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))
  }, [isAuthenticated])


  return (
    <div className="bg-backGroundColor min-h-screen flex flex-col items-center w-full">
      <Header isAuthenticated={isAuthenticated}/>
      <div className="flex-grow w-full">
      <Outlet context={[isAuthenticated, setIsAuthenticated]}/>
      </div>
    </div>
  )
}

export default App;