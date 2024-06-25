import axios from 'axios'
import React, { useState, useEffect } from 'react'
import RestaurantCard from '../components/RestaurantCard'

const ProfilePage = () => { 
  const [favorites, setFavorites] = useState([])
  const [user, setUser] = useState({ email:''})
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')


  const getUserFavorites = () => {
    axios.get('/api/getFavorites')
      .then(res => {
        setFavorites(res.data.favorites)
      })
  }

  useEffect(() => {
    axios.get('/api/profile')
      .then(response => {
        setUser(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the profile!', error)
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

  const favoriteRestaurantList = favorites.map(favorite => {
    return (
      // <RestaurantCard 
      //   restaurant={favorite.restaurant}
      //   />
      <div>
        <h5>{favorite.restaurant.name}</h5>
        <p>Restaurant rating: {favorite.restaurant.rating}</p>
        <p> {favorite.restaurant.formatted_address}</p>
      </div>
    )
  })

  // on load, retrieve all user's favorite restaurants
  useEffect(() => {
    getUserFavorites()
  }, [])

  return (

    <>
   
    <h3>Welcome to your Profile!</h3>
    <p>{user.email}</p>
    <form onSubmit={handleUpdateProfile}>
      <label>New Email:</label>
        <input 
        value={newEmail} 
        type='email' 
        name='email'
        id='email'
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder='@gmail.com'
        />

      <label>New Password:</label>
        <input 
        value={newPassword}
        type='password'
        name='password'
        id='password'
        onChange={(e) => setNewPassword(e.target.value)} 
        placeholder='********'
        />

      <button type='submit'>Update Profile</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>

    </form>
    <br/>
    <br/>
    <h5>Your Favorite Restaurants</h5>
    {favoriteRestaurantList}
    
    </>
  )
}

export default ProfilePage