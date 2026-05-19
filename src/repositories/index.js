const AdminAuthRepository = require('./admin/auth.repository');
const DoctorRepository = require('./admin/doctor.repository');
const DoctorAuthRepository = require('./doctor/auth.repository');

module.exports = {
    AdminAuthRepository:require('./admin/auth.repository'),
    DoctorRepository:require('./admin/doctor.repository'),
    DoctorAuthRepository:require('./doctor/auth.repository'),
};