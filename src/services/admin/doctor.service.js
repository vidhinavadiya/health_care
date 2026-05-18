const { DoctorRepository } = require('../../repositories');
const db = require('../../database/models');

class DoctorService {
    constructor() {
        this.doctorRepository = new DoctorRepository();
    }
    //create Doctor profile
    createDoctor = async (payload, admin, file) => {
        const transaction = await db.sequelize.transaction();
        try {
            //check email
            const existingDoctor = await 
            this.doctorRepository.findDoctorByEmail(
                payload.email
            );
            if (existingDoctor) {
                throw new Error("doctor email already existing");
            }
            //create user
            const user = await
            this.doctorRepository.createUser({
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                role: 'DOCTOR',
                isVerified: false
            }, transaction);

            //create doctor profile
            const doctorPayload = {
                user_id: user.id,
                specialization: payload.specialization,
                department: payload.department || null,
                qualification: payload.qualification,
                experience_year: payload.experience_years || 0,
                consultation_fee: payload.consultation_fee || null,
                license_number: payload.license_number,
                gender: payload.gender,
                hospital_name: payload.hospital_name || null,
                date_of_birth: payload.date_of_birth || null,
                bio: payload.bio || null,
                language: payload.language || null,
                profile_image: file ? file.path : null,
                address: payload.address || null,
                city: payload.city || null,
                state: payload.state || null,
                country: payload.country || null,
                pincode: payload.pincode || null,
                latitude: payload.latitude || null,
                longitude: payload.longitude || null,
                timezone: payload.timezone || 'Asia/Kolkata',
                is_verified: payload.is_verified || false,
                is_available: payload.is_available ?? true,
                average_rating: payload.average_rating || 0,
                total_reviews: payload.total_reviews || 0,
                last_login_at: payload.last_login_at || null,
                created_by: admin?.id || null
            };
            //create doctor profile
            const doctor = await 
            this.doctorRepository.createDoctor(
                doctorPayload,
                transaction
            );
            await transaction.commit();
            return doctor;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };

    //update doctor profile
    updateDoctor = async (DoctorId, payload, admin, file) => {
        const transaction = await db.sequelize.transaction();
        try {
            const doctor = await this.doctorRepository.findDoctorById(DoctorId);
            if (!doctor) {
                throw new Error("doctor not found");
            }
            //update doctor profile
            const updatePayload = {
                specialization: payload.specialization,
                department: payload.department,
                qualification: payload.qualification,
                experience_year: payload.experience_years,
                gender: payload.gender,
                hospital_name: payload.hospital_name,
                date_of_birth: payload.date_of_birth,
                bio: payload.bio,
                language: payload.language,
                profile_image: file ? file.path : doctor.profile_image,
                address: payload.address,
                city: payload.city,
                state: payload.state,
                country: payload.country,
                pincode: payload.pincode,
                latitude: payload.latitude,
                longitude: payload.longitude,
                updated_by: admin.id                
            };
            //update doctor profile
            await this.doctorRepository.updateDoctor(
                doctor,
                updatePayload,
                transaction
            );
            await transaction.commit();
            return doctor;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };

    //update status
    updateStatus = async (DoctorId, admin) => {
        const doctor = await this.doctorRepository.findDoctorById(
            DoctorId
        );
        if (!doctor) {
            throw new Error("doctor not found");
        }
        doctor.is_available = !doctor.is_available;
        doctor.updated_by = admin.id;
        await doctor.save();
        return doctor;
    };

    //delete doctor profile
    deleteDoctor = async (DoctorId) => {
        const doctor = await this.doctorRepository.findDoctorById(
            DoctorId
        );
        if (!doctor) {
            throw new Error("doctor not found");
        }
        await this.doctorRepository.deleteDoctor(
            doctor
        );
        return true;
    };

    //view doctor profile
    getDoctor = async (doctorId) => {
        const doctor = await this.doctorRepository.getDoctorById(
            doctorId
        );
        if (!doctor) {
            throw new Error("doctor not found");
        }
        return doctor;
    };

    //list doctor
    getDoctorList = async (page = 1, limit = 10) => {
        const offset = (page - 1)*limit;
        return this.doctorRepository.getDoctorList(
            offset,
            Number(limit)
        );
    };
}

module.exports = DoctorService;