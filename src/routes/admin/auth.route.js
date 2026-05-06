const express = require('express');
const router = express.Router();

const AuthControllerClass = require('../../controllers/admin/auth.controller');
const AuthController = new AuthControllerClass();

//login admin
router.post('/login',
    async (req,res) => {
        let result = await AuthController.login(req);
        res.status(result.status).send(result);
    }
);

module.exports = router;