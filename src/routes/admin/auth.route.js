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
/* 
  #swagger.tags = ['Admin']
  #swagger.summary = 'Admin Login'
  #swagger.description = 'Login using email and password'

  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          example: 'admin@gmail.com'
        },
        password: {
          type: 'string',
          example: '123456'
        }
      }
    }
  }

  #swagger.responses[200] = {
    description: 'Login successful',
    schema: {
      success: true,
      message: 'Admin login successful',
      data: {
        admin: {
          id: 'uuid',
          name: 'Admin',
          email: 'admin@healthcare.com',
          role: 'ADMIN'
        },
        token: 'jwt_token'
      }
    }
  }

  #swagger.responses[400] = {
    description: 'Invalid credentials'
  }
*/
);



module.exports = router;