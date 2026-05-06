const { Sequelize } = require('sequelize');
require('dotenv').config();
const seedAdmin = require('../seeders/20260506044342-Admin-login');

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
        await sequelize.authenticate();
        console.log('✅ Database connected successfully!');

        await sequelize.sync({ alter: true });
        console.log('✅ Tables synced!');
        
                // ✅ CHECK FIRST (IMPORTANT)
        const [result] = await sequelize.query(
            "SELECT * FROM users WHERE email = 'admin@healthcare.com'"
        );

        if (result.length === 0) {
            await seedAdmin.up(
                sequelize.getQueryInterface(),
                Sequelize
            );
            console.log("✅ Admin Seeded");
        } else {
            console.log("ℹ️ Admin already exists");
        }
    } catch (error) {
        console.error('❌ Unable to connect to database:', error);
    }
};

connectDB();

module.exports = sequelize;