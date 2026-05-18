const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/uploads/doctor_profile_image.middleware');
const DoctorControllerClass = require('../../controllers/admin/doctor.controller');
const DoctorController = new DoctorControllerClass();

//create Doctor
router.post(
    '/create',
    auth('ADMIN'),
    upload.single('profile_image'),
    async (req, res) => {
        const result = await DoctorController.create(req);
        res.status(result.status).send(result);
    }
    /*
        #swagger.tags = ['Admin | Doctor']
        #swagger.summary = 'create doctor'
    */
);

//update doctor
router.put(
    '/update/:id',
    auth('ADMIN'),
    upload.single('profile_image'),
    async (req, res) => {
        const result = await DoctorController.update(req);
        res.status(result.status).send(result);
    }
);

router.patch(
    '/status/:id',
    auth('ADMIN'),
    async (req, res) => {
        const result = await DoctorController.status(req);
        res.status(result.status).send(result);
    }
);

//delete doctor
router.delete(
    '/delete/:id',
    auth('ADMIN'),
    async (req, res) => {
        const result = await DoctorController.delete(req);
        res.status(result.status).send(result);
    }
);

//view doctor profile
router.get(
    '/view/:id',
    auth('ADMIN'),
    async (req, res) => {
        const result = await DoctorController.view(req);
        res.status(result.status).send(result);
    }
);

//list
router.get(
    '/list',
    auth('ADMIN'),
    async (req, res) => {
        const result = await DoctorController.list(req);
        res.status(result.status).send(result);
    }
);

module.exports = router;