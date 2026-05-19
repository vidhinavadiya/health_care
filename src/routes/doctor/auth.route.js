const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth.middleware');
const AuthControllerClass = require('../../controllers/doctor/auth.controller');
const authCtrl = new AuthControllerClass();
const upload = require('../../middlewares/uploads/doctor_profile_image.middleware');

router.post(
  '/set-password',
  async (req, res) => {
    let result = await authCtrl.setPassword(req);
    res.status(result.status).send(result);
  }
);

router.post(
    '/login',
    async (req, res) => {
        let result = await authCtrl.login(req);
        res.status(result.status).send(result);
    }
    /*
        #swagger.tags = ['Doctor | Auth']
        #swagger.summary = 'Doctor Login'

        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["email", "password"],
                        properties: {
                            email: {
                                type: "string",
                                example: "doctor@gmail.com"
                            },
                            password: {
                                type: "string",
                                example: "12345678"
                            }
                        }
                    }
                }
            }
        }
    */
);

router.get(
    '/profile',
    auth('DOCTOR'),
    async (req, res) => {
        let result = await authCtrl.profile(req);
        res.status(result.status).send(result);
    }
    /*
        #swagger.tags = ['Doctor | Profile']
        #swagger.summary = 'Get Doctor Profile'

        #swagger.security = [{
            "bearerTokenAuth": []
        }]
    */
);

router.put(
    '/update-profile',
    auth('DOCTOR'),
    upload.single('profile_image'),
    async (req, res) => {
        let result = await authCtrl.updateProfile(req);
        res.status(result.status).send(result);
    }
    /*
        #swagger.tags = ['Doctor | Profile']
        #swagger.summary = 'Update Doctor Profile'

        #swagger.security = [{
            "bearerTokenAuth": []
        }]
    */
);

module.exports = router;