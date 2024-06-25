//This file will act as a controller for the function that fetchs the restaurant data 
//and it will tell the code what to do when a user asks for restaurant information
// so first we will import the function in api.js so we can use it here.

import { fetchRestaurants } from "../src/services/api.js";
import { User, Favorite, Restaurant } from '../database/model.js'
import bcrypt from 'bcrypt'


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

    if (!req.session.user) {
        return res.status(401).send({
            message: "No user in session"
        })
    }
    
    try {
        const favorites = await Favorite.findAll({
            where: { user_id: req.session.user.userId },
            include: { model: Restaurant }
        })
        console.log("HIT")
        console.log(favorites)
        res.status(200).json({
            message: "User favorites found",
            favorites: favorites
        })
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


export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            
            console.log('user not found');

            return res.status(404).json({ error: 'User not found!' })

        }

        console.log('user found:', user);
        
        // const isMatch = await bcrypt.compare(password, user.password)
        const isMatch = user.password === password

        if (!isMatch) {
            console.log('wrong password');
            
            return res.status(400).json({ error: 'wrong password'})
        }



        req.session.user = {
            userId: user.userId,
            // name: user.name,
            email: user.email,
        };

        res.status(200).json({ message: 'Loging successful!', user: req.session.user })
    } catch (error) {
        console.log('login failed:', error);
        
        res.status(500).json({ error: 'Login failed!' })
    }

};


export const registerUser = async (req, res) => {
    const { email, password } = req.body
    try {
        // const hashedPassword = await bcrypt.hash(password, 2);
        const newUser = await User.create({ email, password })
        req.session.user = {
            userId: newUser.userId,
            email: newUser.email
        }
        res.status(201).json({ message: 'User registered successfully!' })
    } catch (error) {
        res.status(500).json({ error: 'Registration failed!' })
    }
};

//session check function
export const sessionCheck = async (req, res) => {
    if(req.session.user) {
        res.send({
            message: 'user is still logged in',
            success: true,
            userId: req.session.user.id
        });
    } else {
        res.send({
            message: 'no user logged in',
            success: false
        })
    }
};

export const logoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'logout failed', success: false })
        }
        res.clearCookie('connect.sid')
        res.status(200).json({ message: 'Logout successful', success: true })
    })
};

export const createRestaurant = async (req, res) => {
    const { restaurant } = req.body

    const restaurantInDB = await Restaurant.findOne({
        where: {
            place_id: restaurant.place_id
        }
    })

    if (restaurantInDB) {
        return res.status(200).send({
            message: "Restaurant already in db",
            newRestaurant: restaurantInDB
        })
    }

    try {
        const newRestaurant = await Restaurant.create({
            name: restaurant.name, 
            formatted_address: restaurant.formatted_address, 
            lat: restaurant.geometry.location.lat, 
            lng: restaurant.geometry.location.lng, 
            icon: restaurant.icon, 
            business_status: restaurant.business_status,
            place_id: restaurant.place_id, 
            rating: restaurant.rating,
            user_ratings_total: restaurant.user_ratings_total,
        })

        res.status(200).send({
            message: "Restaurant created",
            newRestaurant: newRestaurant
        })
    } catch (err) {
        res.status(500).send({
            message: error,
            newRestaurant: null
        })
    }
}

export const createFavorite = async (req, res) => {
    const { restaurant } = req.body
    
    // Check if user has already favorited this restaurant and end function if so
    if (await Favorite.findOne({
        where: {
            restaurant_id: restaurant.restaurantId,
            user_id: req.session.user.userId
        }
    })) {
        return res.status(200).send({
            message: "User already favorited this restaurant"
        })
    } 

    // Create a new Favorite object linking the user and the restaurant
    const newFavorite = await Favorite.create({
        user_id: req.session.user.userId,
        restaurant_id: restaurant.restaurantId
    })

    return res.status(200).send({
        message: "New favorite restaurant added!",
        newFavorite: newFavorite
    })

}
// profile features

//it will grab the data from the database using the ID (user.findByPk)
//the attributes means that it will fetch data only with userId and email
//it will check if the user exist to send the data to the request or send an error if there is one

export const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user.userId, {
            attributes: ['userId', 'email']
        });

        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ error: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
};

//updatin the user info

export const updateProfile = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByPk(req.session.user.userId)

        if (user) {
            if(email) user.email = email;
            if (password) user.password = password;
            
            await user.save()
            res.json({ message: 'Profile updated successfully' })
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error '})
    }
};

// delete user account
export const deleteAccount = async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user.userId)

        if(user) {
            await user.destroy()
            res.json({ message: 'Account deleted successfully '})
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error '})
    }
}