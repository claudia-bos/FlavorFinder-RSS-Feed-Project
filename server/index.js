

//import packages
import express from 'express';
import ViteExpress from 'vite-express'
import { addFavorite, getFavorites, getRestaurants, removeFavorite } from './controller.js';



//create Express instance

const app = express()

// Set up middleware
//and this is how data is send through the frontend and to the frontend to the backend

app.use(express.json())

//Endpoints

app.get('/api/restaurants', getRestaurants)
app.post('/api/favorites', addFavorite)
app.get('/api/favorites/:userId', getFavorites)
app.delete('/api/favorites/:favoriteId', removeFavorite)




//Open door to server with .listen()
ViteExpress.listen(app, 1997, () => console.log('Server level OVER 9000! View at http://localhost:1997'))