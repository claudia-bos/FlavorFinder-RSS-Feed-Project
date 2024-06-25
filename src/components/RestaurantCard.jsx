import axios from 'axios'
import React from 'react'

const RestaurantCard = ({ restaurant, onAddFavorite }) => {

  // const restaurantImage = restaurant.photos[0].html_attributions[0].split('"')
  // console.log(restaurantImage[1])

  console.log(restaurant)

  const handleAddFavorite = async () => {
    // first send restaurant data to createRestaurant endpont
    const { data } = await axios.post('/api/createRestaurant', { restaurant: restaurant })
    // console.log(data)
    // now send this newRestaurant to createFavorite endpoint
    const res = await axios.post('/api/createFavorite', {restaurant: data.newRestaurant})
    // console.log(res.data)
    alert(res.data.message)  
  }


  return (

    <>

    <h6>{restaurant.name}</h6>
    <p>Restaurant rating: {restaurant.rating}</p>
    <p>{restaurant.formatted_address}</p>
    {/* <img src={restaurantImage[1]} alt="" /> */}
    <button onClick={handleAddFavorite}>Add to Favorites</button> 
    

   
    </>
  )
}

export default RestaurantCard