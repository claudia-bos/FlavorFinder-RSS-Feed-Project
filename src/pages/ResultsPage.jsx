import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import RestaurantList from '../components/RestaurantList.jsx'
import SearchForm from '../components/SearchForm.jsx'
import { fetchRestaurants, addFavorite } from '../services/api.js'

//ResultsPage take one property user which repersents the person using the page
//then we have to implement a state variable = useState so we can keep track of a list of restaurants, this will strore the API data 

const ResultsPage = ({ user }) => {
  const [restaurants, setRestaurants] = useState([])
  const [searched, setSearched] = useState(false)
  const location = useLocation()

 

  //this code will run when the search page is loading, this will fetch restaurant data from my API URL and then display it in the resultsPage
  //with the designed queries, which is city,state,and zipcode(restaurant data will be display with that information)
  useEffect(() => {
    // if (searched) {

      const query = new URLSearchParams(location.search)
      console.log(query);
      const city = query.get('city')
      const state = query.get('state')
      const zipCode = query.get('zipCode')
      
      const getRestaurants = async () => {
        try {
          const data = await fetchRestaurants(city, state, zipCode)
          console.log(data);
          setRestaurants(data)
        } catch (error) {
          console.log('Error fetching restuarants:', error);
        }
      };
      getRestaurants()
    // }

  }, [location.search, setSearched]);
    
    
    
    const handleSearch = () => {
      setSearched(true)
    }


const handleAddFavorite = async (restaurantId) => {
  try {
    await addFavorite(user.id, restaurantId)
    alert('Added to favorites!')
  } catch (error) {
    console.log('Error adding favorite:', error);
  }
};

console.log('Restaurants:', restaurants);

  return (
    <>
    <div>
      
      {/* <h5>Welcome Claudia, Search for Restaurants Here!</h5> */}
      <SearchForm onSearch={handleSearch} />
      {/* {searched && <h5>Here are the best Reviewed Restaurants Near your Area!</h5>} */}
      <h5 className='text-4xl'>Here are the best Reviewed Restaurants Near your Area!</h5>
      <RestaurantList searched={searched} restaurants={restaurants} onAddFavorite={handleAddFavorite}/>
    </div>

    </>
  )
}

export default ResultsPage