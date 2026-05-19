const { successResponse, serverError } = require('../../helpers/response');
const { DoctorAuthService } = require('../../services');

class AuthController {

    constructor() {
        this.authService = new DoctorAuthService();
    }

    setPassword = async (req) => {
        try {
            const result = await this.authService.setPassword(req.body);
            return successResponse({
                success: true,
                message: 'password setup successfully',
                data: result
            });
        } catch (error) {
            return serverError({
                success: false,
                message: error.message
            });
        }
    };

    login = async (req) => {
        try {
            const result = await this.authService.login(req.body);
            return successResponse({
                success: true,
                message: 'doctor login successfully',
                data: result
            });
        } catch (error) {
            return serverError({
                success: false,
                message: error.message
            });
        }
    };

    profile = async (req) => {
        try {
            const result = await this.authService.getProfile(
                req.user
            );
            return successResponse({
                success: true,
                message: 'doctor profile fetched successfully',
                data: result
            });
        } catch (error) {
            return serverError({
                success: false,
                message: error.message
            });
        }
    };

    updateProfile = async (req) => {
        try {
            const result = await this.authService.updateProfile(
                req.user, req.body, req.file
            );
            return successResponse({
                success: true,
                message: 'doctor profile updated successfully',
                data: result
            });
        } catch (error) {
            return serverError({
                success: false,
                message: error.message
            });
        }
    };
};

module.exports = AuthController;