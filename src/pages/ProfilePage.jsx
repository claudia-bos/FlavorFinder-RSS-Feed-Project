import axios from 'axios'
import React, { useState, useEffect } from 'react'
import RestaurantCard from '../components/RestaurantCard'
import { useNavigate } from 'react-router-dom'
import { StarIcon, UserIcon, MapPinIcon } from '@heroicons/react/24/solid'

const ProfilePage = () => { 
  const [favorites, setFavorites] = useState([])
  const [user, setUser] = useState({ email:''})
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()


  const getUserFavorites = () => {
    axios.get('/api/getFavorites')
      .then(res => {
        setFavorites(res.data.favorites)

      })
      .catch(err => {
        console.log('There was an error in fetching user favorites', err)
        navigate("/")
      })
  }

  useEffect(() => {
    axios.get('/api/profile')
      .then(response => {
        setUser(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the profile!', error)
        navigate("/")
      })
      
      getUserFavorites()
  }, [])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.put('/api/profile', {
        email: newEmail || user.email,
        password: newPassword
      })
      console.log(response.data.message)
      setUser({ ...user, email: newEmail || user.email })
    } catch (error) {
      console.error('There was an error updating the profile!', error)
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.')
    if(confirmed) {

      try {
        const response = await axios.delete('/api/profile')
        console.log(response.data.message)
        window.location.href = '/'
      } catch(error) {
        console.error('There was an error deleting the account!', error)
      }
    }
  }

  const generateMapsUrl = (address) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  const favoriteRestaurantList = favorites.map(favorite => {
    const mapsUrl = generateMapsUrl(favorite.restaurant.formatted_address);
    return (
      // <RestaurantCard 
      //   restaurant={favorite.restaurant}
      //   />
      <div key={favorite.restaurant.place_id} className="bg-white rounded-md shadow-md p-4 mb-4">
        <h6 className="text-lg font-semibold font-garamond">{favorite.restaurant.name}</h6>
        <p className="text-sm text-yellow-700">
          <span className="flex items-center ml-1">
          Restaurant rating: {favorite.restaurant.rating}
          <StarIcon className="h-5 w-5 text-yellow-500 ml-1" />
          </span>
        </p>
        <a href={mapsUrl} target='_blank' rel='noopener noreferrer' className="text-sm text-gray-500 flex items-center"> 
        <MapPinIcon className="h-4 w-5 text-gray-500 mr-1" />
        {favorite.restaurant.formatted_address}
        </a>
      </div>
    )
  })

  // on load, retrieve all user's favorite restaurants
  useEffect(() => {
    getUserFavorites()
  }, [])

  return (

    <div className="min-h-screen flex flex-col items-center bg-backGroundColor px-4 py-12">
      <div className="w-full max-w-2xl bg-headerGreen bg-opacity-20 p-6 rounded-md shadow-lg">

        <h3 className="text-2xl font-bold">Welcome to your Profile</h3>
        <p className=" mb-6 text-xl flex items-center">
        <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
        <span>{user.email}</span>
        </p>
        <form onSubmit={handleUpdateProfile} className="space-y-4">

          <div>
              <label htmlFor='email' className="block text-sm font-medium text-gray-700">New Email:</label>
                  <input 
                  value={newEmail} 
                  type='email' 
                  name='email'
                  id='email'
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder='@gmail.com'
                  className="mt-1 block w-72 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  />
            </div>

            <div>
              <label htmlFor='password' className="block text-sm font-medium text-gray-700">New Password:</label>
                  <input 
                  value={newPassword}
                  type='password'
                  name='password'
                  id='password'
                  onChange={(e) => setNewPassword(e.target.value)} 
                  placeholder='********'
                  className="mt-1 block w-72 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  />
            </div>

            <div className="flex space-x-4">
              <button type='submit' className="bg-hoverb text-white px-4 py-2 rounded-md shadow-sm hover:bg-button focus:outline-none focus:ring-2 focus:ring-green-500">Update Profile</button>
              <button type='button' onClick={handleDeleteAccount} className="bg-hoverb text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-500">Delete Account</button>
            </div>

        </form>
          
          <div className="mt-8">
          <h5 className="text-xl font-semibold mb-4">Your Favorite Restaurants</h5>
          {favoriteRestaurantList}
          </div>

      </div>   
    </div>
  )
}

export default ProfilePage