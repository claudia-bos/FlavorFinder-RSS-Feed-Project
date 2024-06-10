import React from 'react';
import './App.css'
import { Link, Outlet } from 'react-router-dom';
import Header from './components/Header';
import ProfilePage from './pages/ProfilePage';




function App() {

  return (
    <>
      <Header />
      <Outlet />
      <ProfilePage/>
    </>
  )
}

export default App