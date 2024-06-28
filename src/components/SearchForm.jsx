import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchForm = ({ onSearch, className}) => {
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const navigate = useNavigate() 
  // this with the usenavigate imported it is a hook from react-router-dom and helps navigate throughout the pages
  

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      navigate(`/results?city=${city}&state=${state}&zipCode=${zipCode}`);
      onSearch();
    } catch (error) {
      console.log('Error searching restaurants:', error)
    }
  };

  return (
  <>
  {/* my className is just for styling purposes */}

    <form onSubmit={handleSearch} className={`bg-box px-10 py-6 rounded-md shadow-lg space-y-4 bg-opacity-10 ${className}`}>
      <div className="space-y-4">

        <div >
          <label htmlFor='city' className="block text-lg font-medium text-textColor font-garamond text-left">City:</label>
          <div className="mt-2" >
          <input 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type='text' 
          name='city' 
          id='city' 
          placeholder='city...'
          required
          className="block w-full appearance-none rounded-md border border-gray-600 bg-backGroundColor bg-opacity-20 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"    
          />
          </div>
        </div>

        <div>
          <label htmlFor='state' className="block text-lg font-medium text-gray-700 text-textColor font-garamond  text-left">State: </label>
          <div className="mt-2">
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            type='text' 
            name='state' 
            id='state' 
            placeholder='state...'
            className="block w-full appearance-none rounded-md border border-gray-600 bg-backGroundColor bg-opacity-30 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"    
          />
          </div>
        </div>

        <div>
         <label htmlFor='zip-code' className="block text-lg font-medium text-gray-700 text-textColor font-garamond text-left">ZipCode: </label>
         <div className="mt-2">
          <input
           value={zipCode}
           onChange={(e) => setZipCode(e.target.value)}
           type='zip-code' 
           name='zip-code' 
           id='zip-code' 
           placeholder='84780'
           className="block w-full appearance-none rounded-md border border-gray-600 bg-backGroundColor bg-opacity-30 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"    
          />
          </div>
        </div>

      </div>

      <div className='text-center'>
        <button type='submit' className="flex w-full justify-center rounded-md bg-hoverGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hoverGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customeGreen" >Find now</button>
      </div>   

    </form>
    
   
  </>
  )
}

export default SearchForm