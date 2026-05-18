const { successResponse, serverError } = require('../../helpers/response');
const { DoctorService } = require('../../services');

class DoctorController {
    constructor() {
        this.doctorService = new DoctorService();
    }
    //create doctor
    create = async(req) => {
        try {
            const result = await this.doctorService.createDoctor(
                req.body, req.user, req.file
            );
            return successResponse({
                success: true,
                message: 'doctor created successfully',
                data: result
            });
        } catch (error) {
            return serverError({
                success: false,
                message: error.message
            });
        }
    };

    //update doctor profile
    update = async (req) => {
        try {
            const result = await this.doctorService.updateDoctor(
                req.params.id,
                req.body,
                req.user,
                req.file
            );
            return successResponse({
                success: true,
                message: 'doctor updated',
                data: result
            });
        } catch (error) {
            return serverError({
                success: false,
                message: error.message
            });
        }
    };

    //update status
    status = async (req) => {
        try {
            const result = await this.doctorService.updateStatus(
                req.params.id,
                req.user
            );
            return successResponse({
                success: true,
                message: 'status updated',
                data: result
            });
        } catch (error) {
            return serverError({
                success: false,
                message: error.message
            });
        }
    };

    //delete doctor profile
    delete = async (req) => {
        try {
            const result = await this.doctorService.deleteDoctor(
                req.params.id
            );
            return successResponse({
                success: true,
                message: 'doctor deleted'
            });
        } catch (error) {
            return serverError({
                success: false,
                message: error.message
            });
        }
    };

    //view doctor profile
    view = async (req) => {
        try {
            const result = await this.doctorService.getDoctor(
                req.params.id
            );
            return successResponse({
                success: true,
                message: 'view profile',
                data: result
            });
        } catch (error) {
            return serverError({
                success: false,
                message: error.message
            });
        }
    };

    //list doctor
    list = async (req) => {
        try {
            const result = await this.doctorService.getDoctorList(
                req.query.page,
                req.query.limit
            );
            return successResponse({
                success: true,
                message: 'all doctor profile',
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

module.exports = DoctorController;