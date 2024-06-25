import db, { User, Restaurant, Favorite} from "./model.js"
import restaurantData from './restaurants.json' assert { type: 'json' }
import userData from './users.json' assert { type: 'json' }
import lodash from 'lodash';

console.log(`Syncing database...`)
await db.sync({force: true}) // re-creates all tables from model.js
console.log(`sending database...`)

//we create a asynchronous function so we can insert multiple restaurant data into the database
//asynchronouns work with promises. promise.all() = handle multiple asynchronouns operations
const restaurantsInDB = await Promise.all(restaurantData.map(async restaurant => {
    const { name, formatted_address, lat, lng, icon, bussiness_status, opem_now, photo_reference, place_id, compound_code, globa_code, price_level, rating, user_ratings_total, types } = restaurant
//this creates a restaurant table
    const newRestaurant = await Restaurant.create({
        name,
        formatted_address,
        lat,
        lng,
        icon,
        bussiness_status,
        // opem_now,
        // photo_reference,
        place_id,
        // compound_code,
        // globa_code,
        // price_level,
        rating,
        user_ratings_total,
        // types
    });

    return newRestaurant
}));


// HERE we create a constant variable which will store the results of the database operations
// await Promise.all This waits for all the promises (asynchronous operations) inside the Promise.all to complete before continuing.
//so 'Promise.all' in this case will wait for the user to logging in or register before doing something else, like showing them the homepage or data in another page.
//using await before promises is like telling the program to wait until all promisses (tasks) are resolved
// then we map over user data(user data is an object like: name: 'claudia', email:'claudia@gmail.com', password: '****')
//so map. goes vor every user and creates an asynchronous fuction that process their data.



const usersInDB = await Promise.all(
    userData.map(async user => {

        const { name, email, password } = user;
        const newUser = await User.create({
            name,
            email,
            password
        });
        return newUser;

    })
);

const favoritesInDB = await Promise.all(usersInDB.flatMap(user => {
    const randomRestaurants = lodash.sampleSize(restaurantsInDB, 3);

    const userFavorites = randomRestaurants.map(restaurant => {
        return Favorite.create({
            user_id: user.userId,
            restaurant_id: restaurant.restaurantId
        });
    });
    return userFavorites
}));


await db.close()