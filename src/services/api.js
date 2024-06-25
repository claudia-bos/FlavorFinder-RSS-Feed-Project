
import axios from 'axios';

//this is the web address where we send our requests to get the information of the restaurants
const API_URL = 'https://map-places.p.rapidapi.com/textsearch/json';
//this is the secret code that will help us access the code
const API_KEY = '8fd9bac121mshda69ed5b7f4a0bfp1dd678jsn0e8dcbf5041d';


//this set up in a way that the user can get data from the API by their state, city and zipcode
//the params: there is the combined city,state,and zipcode that will be enter as a query
//the radius param will send the data of restaurants withing 5 kilometers around the user's place.
//in the bottom this will be in charge of catching any problems while requesting data
export const fetchRestaurants = async (city, state, zipCode) => {
    const query = `restaurants in ${city} ${state} ${zipCode}`;
    try {
        const response = await axios.get(API_URL, {
            params: {
                query: query,          
                radius: 5000
            },

            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'map-places.p.rapidapi.com'
            }
        });
        return response.data.results || [];
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
    
};

//adding the favorite function so it can handle the addFavorite to the backend 
//so this function will send a POST request to my backend endpoint in controller.js to add a restaurant to the user's favorite
//so this will work like the following
//user will click a button to add a restaurant to favorites, so the handleAddFavorite function in resultsPage will be call
//which then will call the addFavorite function here(api.js). This function will send a Post request to the /api/favorites endpoint in index.js
//and will receive the request and then call the addFavorite in controller.js, which it will add the favorite restaurant to the database and send the response back
//so then the function in api.js will process it and return the results.

export const addFavorite = async (userId, restaurantId) => {
    try {
        const response = await axios.post('/api/favorites', {
            userId: userId,
            restaurantId: restaurantId
        });
        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message)
    }
};

// export const getFavorites = async (userId) => {
//     const response  = await axios.get(`/api/favorites/${userId}`)
//     return response.data
// };

