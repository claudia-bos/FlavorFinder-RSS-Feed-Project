import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchForm = () => {
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const navigate = useNavigate() 
  // this with the usenavigate imported it is a hook from react-router-dom and helps navigate throughout the pages
  

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      navigate(`/results?city=${city}&state=${state}&zipCode=${zipCode}`)
    } catch (error) {
      console.log('Error searching restaurants:', error)
    }
  };

  return (
  <>
  {/* my className is just for styling purposes */}
    <div className='search-form'>

      <form onSubmit={handleSearch}>

        <label htmlFor='city'>City:</label>
        <input 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        type='text' 
        name='city' 
        id='city' 
        placeholder='Washigton'
        required
        />

        <label htmlFor='state'>State: </label>
        <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        type='text' 
        name='state' 
        id='state' 
        placeholder='Utah'
        required
        />

        <label htmlFor='zip-code'>Zip: </label>
        <input
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        type='zip-code' 
        name='zip-code' 
        id='zip-code' 
        placeholder='84780'
        required
        />

          
        <button type='submit'>Find now</button>

      </form>
    
    </div>
  </>
  )
}

export default SearchForm