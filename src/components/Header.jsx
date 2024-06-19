import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = ({ isAuthenticated }) => {
  return (
    <>
    <header>
       
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">FlavorFinder</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {isAuthenticated && <Link className="nav-link" to="/find-restaurant-page">Find Restaurant</Link>}
            {isAuthenticated && <Link className="nav-link" to="profile-page">My Profile</Link>}
          </div>
        </div>
      </div>
    </nav>
        
    </header>
    </>
  )
}

export default Header