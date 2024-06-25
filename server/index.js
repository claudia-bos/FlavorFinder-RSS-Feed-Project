

//import packages
import express from 'express';
import ViteExpress from 'vite-express'
import { 
    addFavorite, 
    getFavorites, 
    getRestaurants, 
    loginUser, 
    registerUser, 
    removeFavorite, 
    logoutUser, 
    sessionCheck,
    createRestaurant,
    createFavorite,
    getProfile,
    updateProfile,
    deleteAccount
} from './controller.js';
import session from 'express-session';


//create Express instance

const app = express()

// Set up middleware
//and this is how data is send through the frontend and to the frontend to the backend
app.use(session({
    secret: 'hello',
    resave: false,
    saveUninitialized: false,
}))

app.use(express.json())

//Endpoints

app.get('/api/restaurants', getRestaurants)
app.post('/api/favorites', addFavorite)
app.get('/api/getFavorites', getFavorites)
app.delete('/api/favorites/:favoriteId', removeFavorite)

app.get('/api/session-check', sessionCheck)
app.get('/api/logout', logoutUser)
app.post('/api/login', loginUser)
app.post('/api/register', registerUser)

app.post('/api/createRestaurant', createRestaurant)
app.post('/api/createFavorite', createFavorite)

app.get('/api/profile', getProfile)
app.put('/api/profile', updateProfile)
app.delete('/api/profile', deleteAccount)


//Open door to server with .listen()
ViteExpress.listen(app, 1997, () => console.log('Server level OVER 9000! View at http://localhost:1997'))