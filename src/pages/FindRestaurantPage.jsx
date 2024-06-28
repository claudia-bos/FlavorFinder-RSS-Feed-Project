import React from 'react'
import SearchForm from '../components/SearchForm'
// import logo from '../assets/logo.png'



const FindRestaurantPage = () => {





  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-backGroundColor px-4 py-12">
      <header className="text-center mb-8 mt-8">
      <div className="flex items-center">
      <div className="flex flex-col justify-center">
        <h3 className="text-3xl font-bold font-garamond">Welcome to FlavorFinder</h3>
        <p className="text-xl mt-2 mb-2 sm:antialiased ">Search for Restaurants Here</p> 
      </div>
      </div>
      </header>
      <div className="w-full max-w-xl mt-2">        
       <SearchForm/>
      </div>
    </div>
  )
}

export default FindRestaurantPage;