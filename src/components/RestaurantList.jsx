import React from 'react'
import RestaurantCard from './RestaurantCard.jsx'

const RestaurantList = ({ restaurants, onAddFavorite }) => {


//So this file will be comunicating with RestaurantCard component and then this RestaurantList component will be comunicating with the ResultsPage
// we map over restaurants so it can display a restaurantCard for each restaurant 


  // if (!Array.isArray(restaurants)) {
  //   return <div>No restaurants available</div>
  // }

  return (

    <>
    
      <div>
        {restaurants.map((restaurant) => (
          <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onAddFavorite={onAddFavorite}
          />
        ))}
      </div>
    </>
  )
};

// RestaurantList.prototype = {
//   restaurants: prototype.array.isRequired,
//   onAddFavorite: prototype.func.isRequired
// }

export default RestaurantList