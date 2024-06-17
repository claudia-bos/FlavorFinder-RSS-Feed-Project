//This file will act as a controller for the function that fetchs the restaurant data 
//and it will tell the code what to do when a user asks for restaurant information
// so first we will import the function in api.js so we can use it here.

import { fetchRestaurants } from "../src/services/api.js";
import { User, Favorite, Restaurant } from '../database/model.js'


//now we will create an async function so this can act as a helper, and we can 
//use when someone asks for restaurant information
//it will take two params (req, res)
//req (request that user makes), and res(respons that is given back)
//const { city, state, zip } = req.query this will take the details from the user's Request


export const getRestaurants = async (req, res) => {
    const { city, state, zipCode } = req.query;
    try {
        const restaurants = await fetchRestaurants(state, city, zipCode)
        res.status(200).json(restaurants)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurants', error: error.message })
    }
};


//we create a addFavorite which will add restaurants to the user's list of favorites
//the const { userId , restaurantId } this extracts the userId and restaurantId from the req.body.
//await Favorite.create({ userId, restaurantId }) creates a new record in my database and it takes userId and restaurantId 
//as properties inside a object. those are the details of that record, and if that work the restaurant added as a fav. will be send

export const addFavorite = async (req, res) => {
    const { userId, restaurantId } = req.body
    try{
        const favorite = await Favorite.create({ userId, restaurantId })
        res.status(201).json(favorite)
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite', error })
    }
};


//this function will get all favorites restaurants for the user
//and will ensure that each user gets a personalized list of their favorite restaurants in their profile.
//we will use finAll so it can give all restaurants that the user with the right id has added as fav.

export const getFavorites = async (req, res) => {
    const { userId } = req.params
    try {
        const favorites = await Favorite.findAll({
            where: { userId },
            include: 'Restaurant'
        })
        res.status(200).json(favorites)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorites', error })
    }
};


//this function is created to remove the added restaurant to favorites from the list
//the const { favoriteId } targets the restaurant added to the list of favorites by their ID
//we use await favorite.destroy will be use to remove the fav restaurant from the records in the data that was created when the user added to their favorites

export const removeFavorite = async (req, res) => {
    const { favoriteId } = req.params
    try {
        await favorite.destroy({ where: { id: favoriteId } })
        res.status(200).json({ message: 'Favorite removed'})
    } catch (error) {
        res.status(500).json({ message: 'Error removing favorite', error })
    }
};