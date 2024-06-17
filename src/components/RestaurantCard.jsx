import React from 'react'

const RestaurantCard = ({ restaurant, onAddFavorite }) => {


  

  return (

    <>


    <h4>Here are the best Reviewed Restaurants Near Washigton, UT</h4>

    <h4>{restaurant.name}</h4>
    <p>{restaurant.formatted_address}</p>
    <button onClick={() => onAddFavorite(restaurant.id)}>Add to Favorites</button> 
    

   
    </>
  )
}

export default RestaurantCard