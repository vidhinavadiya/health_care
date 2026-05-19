const AdminAuthController = require('./admin/auth.controller');
const DoctorController = require('./admin/doctor.controller');
const DoctorAuthController = require('./doctor/auth.controller');

module.exports = {
    AdminAuthController:require('./admin/auth.controller'),
    DoctorController:require('./admin/doctor.controller'),
    DoctorAuthController:require('./doctor/auth.controller'),
};