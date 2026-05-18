const { User, Doctor } = require('../../database/models');

class DoctorRepository {

    createUser = async (payload, transaction) => {
        return User.create(payload, { 
            transaction 
        });
    };

    //create doctor
    createDoctor = async (payload, transaction) => {
        return Doctor.create(payload, { 
            transaction 
        });
    };

    findDoctorByEmail = async (email) => {
        return User.findOne({
            where: { email }
        });
    };

    findDoctorById = async (doctorId) => {
        return Doctor.findByPk(doctorId);
    };

    updateDoctor = async (doctor, payload, transaction) => {
        return doctor.update(payload, { 
            transaction 
        });
    };

    deleteDoctor = async (doctor, transaction) => {
        return doctor.destroy({
            transaction
        });
    };

    getDoctorById = async (doctorId) => {
        return Doctor.findOne({
            where: { id: doctorId },
            include: [
                {   
                    model: User,
                    as: 'user'
                },
            ],
        });
    };

    getDoctorList = async (offset, limit) => {
        return Doctor.findAndCountAll({
            offset,
            limit,
            include: [{
                model: User,
                as: 'user'
            }],
            order: [
            ['createdAt','DESC']
            ]
        });
    };
}

module.exports = DoctorRepository;