import { DataTypes, Model } from "sequelize";
import util from 'util';
import url from 'url';
import connectToDB from "./db.js";

export const db = await connectToDB('postgresql:///flavorfinder');


//This tells sequelize this is a table we will have
export class User extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },

    {
        modelName: 'user',
        sequelize: db,
    },

);

export class Restaurant extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

Restaurant.init(
    {
        restaurantId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        formatted_address: {
            type: DataTypes.STRING,
            allowNull: false
        },

        lat: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false
        },

        lng: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false
        },

        icon: {
            type: DataTypes.STRING,
        },

        business_status:{
            type: DataTypes.STRING,
        },
         
        open_now: {
            type: DataTypes.BOOLEAN,
        },

        photo_reference: {
            type: DataTypes.STRING,
        },

        place_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        compound_code: DataTypes.STRING,
        global_code: DataTypes.STRING,
        price_level: DataTypes.INTEGER,
        rating: DataTypes.DECIMAL(2, 1),
        user_ratings_total: DataTypes.INTEGER,
        types: DataTypes.TEXT,
    },

    {
        sequelize:db,
        modelName: 'restaurant'
    },
    
);


export class Favorite extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}
Favorite.init(

    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },

    {
        sequelize: db,
        modelName: 'favorite',
    }
);


//Associations

User.hasMany(Favorite, { foreignKey: 'user_id' });
Favorite.belongsTo(User, { foreignKey: 'user_id' });

Restaurant.hasMany(Favorite, { foreignKey: 'restaurant_id' });
Favorite.belongsTo(User, { foreignKey: 'restaurant_id' });


if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
    console.log('Syncing database...');
    db.sync()
      .then(() => {
        console.log('Database synced successfully!');
      })
      .catch((err) => {
        console.error('Error syncing database:', err);
      });
  }
  

  export default db;