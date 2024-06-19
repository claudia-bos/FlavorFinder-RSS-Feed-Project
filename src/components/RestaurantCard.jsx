import React from 'react'

const RestaurantCard = ({ restaurant, onAddFavorite }) => {

  // const restaurantImage = restaurant.photos[0].html_attributions[0].split('"')
  // console.log(restaurantImage[1])

  console.log(restaurant)


  return (

    <>



    <h6>{restaurant.name}</h6>
    <p>{restaurant.formatted_address}</p>
    {/* <img src={restaurantImage[1]} alt="" /> */}
    <button onClick={() => onAddFavorite(restaurant.id)}>Add to Favorites</button> 
    

   
    </>
  )
}

export default RestaurantCard