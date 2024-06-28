import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import RestaurantList from '../components/RestaurantList.jsx'
import SearchForm from '../components/SearchForm.jsx'
import { fetchRestaurants, addFavorite } from '../services/api.js'
import perur from '../assets/perur.jpg'

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
          //sorted
          const sortedData = data.sort((a, b) => b.rating - a.rating)
          setRestaurants(sortedData)
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
    <div>

      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${perur})` }}>     
          {/* <h5>Welcome Claudia, Search for Restaurants Here!</h5> */}
          <div className="bg-black bg-opacity-50 p-5 py-7">
            <div className="bg-white bg-opacity-10 p-8 py-7 rounded-md shadow-md">            
               <SearchForm onSearch={handleSearch} className="shadow-none"/>
            </div>
          </div>
          {/* {searched && <h5>Here are the best Reviewed Restaurants Near your Area!</h5>} */}
      </div>
          <div>
          <h5 className="text-2xl mt-8 mb-4 text-center font-bold font-sans"> Here Are The Best Reviewed Restaurants Near Your Area</h5>
          </div>
          <div>
          <RestaurantList searched={searched} restaurants={restaurants} onAddFavorite={handleAddFavorite}/>
          </div>

    </div>
  )
}

export default ResultsPage