const { User, Doctor } = require('../../database/models');

class AuthRepository {

    findBySetupToken = async (token) => {
        return User.findOne({
            where: {
                password_setup_Token: token,
                role: 'DOCTOR',
            },
        });
    };

    findDoctorByEmail = async (email) => {
        return User.findOne({
            where: {
                email,
                role: 'DOCTOR'
            },
        });
    };

    getProfile = async (userId) => {
        return Doctor.findOne({
            where: {
                user_id: userId
            },
            include: [{
                model: User,
                as: 'user',
                attributes: [
                    'id',
                    'name',
                    'email',
                    'phone',
                    'role',
                    'isVerified',
                    'isActive'
                ],
            }]
        });
    };

    updateProfile = async(userId, payload) => {
        const doctor = await Doctor.findOne({
            where: {
                user_id: userId
            }
        });
        if (!doctor) {
            throw new Error("doctor profile not found");
        }
        await doctor.update(payload);
        return doctor;
    };
};

module.exports = AuthRepository;