import axios from 'axios'
import React from 'react'
import { HeartIcon, StarIcon, MapPinIcon } from '@heroicons/react/24/solid'

const RestaurantCard = ({ restaurant, onAddFavorite }) => {
  const generateMapsUrl = (address) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  const mapsUrl = generateMapsUrl(restaurant.formatted_address);

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

    <div className="bg-white rounded-md shadow-md p-4 flex items-start space-x-4 mb-4">

      <div className="flex-grow">
        <h6 className="text-lg font-semibold font-garamond">{restaurant.name}</h6>
        <p className="text-sm text-yellow-700"> 
          <span className="flex items-center ml-1">
          Restaurant rating: {restaurant.rating} 
          <StarIcon className="h-5 w-5 text-yellow-500 ml-1" />
          </span>
        </p>
        <a href={mapsUrl} target='_blank' rel='noopener noreferrer' className="text-sm text-gray-500 flex items-center">
          <MapPinIcon className="h-4 w-5 text-gray-500 mr-1" />
          {restaurant.formatted_address}
        </a>
        {/* <img src={restaurantImage[1]} alt="" /> */}
      </div>  
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAddFavorite}
          className="bg-heartColor text-white p-2 rounded-full hover:bg-heartHover"
        >
          <HeartIcon className="h-4 w-4 text-white" />
        </button>
      </div>

    </div>
  )
}

export default RestaurantCard