import React from 'react'
import { Link } from 'react-router-dom'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import logo from '../assets/FlavorFinder.png'

const Header = ({ isAuthenticated }) => {
  return (
    <header className="relative bg-box shadow-sm w-full rounded-md sm:text-sm">
      <nav className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center space-x-2">
        <Link to="/">
            <img
              className="h-14 w-64"
              src={logo} 
              alt="FlavorFinder Logo"
            />
          </Link>
        </div>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link className="text-2xl font-bold text-white comic-sans no-underline flex items-center space-x-2"  to="/find-restaurant-page">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-900" />
                <span>
                Find Restaurant
                </span>
              </Link>
              <Link className="text-2xl font-bold text-white comic-sans no-underline flex items-center space-x-2"  to="/profile-page">
              <UserCircleIcon className="h-6 w-6 text-gray-900" /> 
                <span>
                My Profile
                </span>
              </Link>
            </>
          ) : (
            <>
            </>
          )}
        </div>
      </nav>
      
    </header>
  );
};

export default Header