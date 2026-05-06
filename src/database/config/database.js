const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
        host: process.env.MYSQLHOST,
        dialect: 'mysql',
        port: process.env.MYSQLPORT || 3306,
        logging: false
    }
);

const connectDB = async () => {
    try {
        console.log("ENV =", process.env.NODE_ENV);
        console.log("HOST =", process.env.MYSQLHOST);
        console.log("PORT =", process.env.MYSQLPORT);
        console.log("USER =", process.env.MYSQLUSER);
        console.log("DB =", process.env.MYSQLDATABASE);
        
        await sequelize.authenticate();
        console.log('✅ Database connected successfully!');
    } catch (error) {
        console.error('❌ Unable to connect to database:', error);
    }
};

connectDB();

module.exports = sequelize;