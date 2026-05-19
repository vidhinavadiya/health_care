const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin/auth.route');
const doctorRoutes = require('./admin/doctor.route');
const setPasswordRoutes = require('./doctor/auth.route');

router.use('/admin', adminRoutes);
router.use('/admin/doctor', doctorRoutes);
router.use('/doctor', setPasswordRoutes);

module.exports = router;