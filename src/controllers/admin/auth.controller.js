const { successResponse, serverError } = require('../../helpers/response');
const { AdminAuthService } = require('../../services');

class AuthController {
    constructor () {
        this.authService = new AdminAuthService();
    }
    //login admin
    login = async (req) => {
        try {
            const result = await this.authService.loginAdmin(req.body);
            return successResponse({
                success: true,
                message: 'admin login successfully',
                data: result
            });
        } catch (error) {
            return serverError({
                success: false,
                message: error.message
            });
        }
    };
}

module.exports = AuthController;