const { where } = require('sequelize');
const { User } = require('../../database/models');

class AuthRepository {

    findAdminByEmail = async (email) => {
        return User.findOne({
            where: {
                email,
                role: 'ADMIN',
                isActive: true
            },
        });
    };
};

module.exports = AuthRepository;