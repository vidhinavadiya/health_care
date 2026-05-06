const { successResponse, serverError } = require('../../helpers/response');
const { AuthService } = require('../../services');

class AuthController {
    constructor () {
        this.authService = new AuthService();
    }
    //login admin
    login = async (req, res) => {
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