const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbName =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_NAME_PRODUCTION
    : process.env.DB_NAME_DEVELOPMENT;

const sequelize = new Sequelize (
    dbName,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: false
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('database connected succesfully...!');
    } catch (error) {
        console.error('unable to connect to the database..!', error);
    }
}

connectDB();

module.exports = sequelize;