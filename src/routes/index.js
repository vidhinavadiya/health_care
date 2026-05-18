const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin/auth.route');
const doctorRoutes = require('./admin/doctor.route');

router.use('/admin', adminRoutes);
router.use('/admin/doctor', doctorRoutes);

module.exports = router;