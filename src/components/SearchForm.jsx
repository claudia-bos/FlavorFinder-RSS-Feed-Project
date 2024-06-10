import React, { useState } from 'react'

const SearchForm = () => {
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')

  const handleSearch = (e) => {
    e.preventDefault();

    console.log('Searching for restaurants in', city, state, zip)

  }

  return (
  <>
  {/* my className is just for styling purposes */}
    <div className='search-form'>

      <form onSubmit={handleSearch}>

        <label htmlFor='city'>City:</label>
        <input 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        type='city' 
        name='city' 
        id='city' 
        placeholder='Washigton'
        />

        <label htmlFor='state'>State: </label>
        <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        type='state' 
        name='state' 
        id='state' 
        placeholder='Utah'
        />

        <label htmlFor='zip-code'>Zip: </label>
        <input
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        type='zip-code' 
        name='zip-code' 
        id='zip-code' 
        placeholder='84780'
        />

          
        <button type='submit'>Find now</button>

      </form>
    
    </div>
  </>
  )
}

export default SearchForm