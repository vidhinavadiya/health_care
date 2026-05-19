const AdminAuthService = require('./admin/auth.service');
const DoctorService = require('./admin/doctor.service');
const DoctorAuthService = require('./doctor/auth.service');

module.exports = {
    AdminAuthService:require('./admin/auth.service'),
    DoctorService:require('./admin/doctor.service'),
    DoctorAuthService:require('./doctor/auth.service'),
};