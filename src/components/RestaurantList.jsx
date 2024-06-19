import React from 'react'
import RestaurantCard from './RestaurantCard.jsx'

const RestaurantList = ({ restaurants, onAddFavorite, searched }) => {

console.log(restaurants);
//So this file will be comunicating with RestaurantCard component and then this RestaurantList component will be comunicating with the ResultsPage
// we map over restaurants so it can display a restaurantCard for each restaurant 

//the conditional means checks if there is value in restaurants, it will go through each restaurant and display it using the RestaurantCard information
//but if there is no value , it will send a messagge 'restaurants are not available

  return (

    <>
    
    {/* <h4>Here are the best Reviewed Restaurants Near your Area!</h4> */}

        {restaurants && restaurants.map((restaurant) => (
          <RestaurantCard
          key={restaurant.place_id}
          restaurant={restaurant}
          onAddFavorite={onAddFavorite}
          />
        ))}
        {restaurants.length === 0 && searched && <div>Loading restaurant...</div>}

    </>
  )
};

export default RestaurantList