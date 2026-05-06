// const { successResponse, serverError } = require('../../helpers/response');
// const { AuthService } = require('../../services');

// class AuthController {
//     constructor () {
//         this.authService = new AuthService();
//     }
//     //login admin
//     login = async (req, res) => {
//         try {
//             const result = await this.authService.loginAdmin(req.body);
//             return successResponse(res, {
//                 success: true,
//                 message: 'admin login successfully',
//                 data: result
//             });
//         } catch (error) {
//             return serverError(res, {
//                 success: false,
//                 message: error.message
//             });
//         }
//     };
// }

// module.exports = AuthController;

const { successResponse, serverError } = require('../../helpers/response');
const { AuthService } = require('../../services');

class AuthController {

    constructor () {
        this.authService = new AuthService();
    }

    login = async (req, res) => {
        try {

            const result = await this.authService.loginAdmin(req.body);

            return res.status(200).json(
                successResponse(
                    200,
                    'admin login successfully',
                    result
                )
            );

        } catch (error) {

            return res.status(500).json(
                serverError(
                    500,
                    error.message,
                    null,
                    error
                )
            );

        }
    };
}

module.exports = AuthController;