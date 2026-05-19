const bcrypt = require('bcrypt');
const { DoctorAuthRepository } = require('../../repositories');
const { verifyToken, generateToken } = require('../../utils/jwt');

class AuthService {

    constructor() {
        this.authRepository = new DoctorAuthRepository();
    }
    setPassword = async (payload) => {
        const { token, password } = payload;
        console.log("TOKEN:", token);
        const decoded = verifyToken(token);
        console.log("DECODED:", decoded);
        
        const user = await this.authRepository.findBySetupToken(
            token
        );
        if (!user) {
            throw new Error("invalid token");
        }

        if (new Date() > user.password_setup_expires) {
            throw new Error("token expired");
        }

        await user.update({
            password,
            isVerified: true,
            password_setup_Token: null,
            password_setup_expires: null,
        });
    };

    login = async (payload) => {
        const { email, password } = payload;
        const doctor = await this.authRepository.findDoctorByEmail(
            email
        );
        if (!doctor) {
            throw new Error("doctor not found");
        }
        if (!doctor.isActive) {
            throw new Error("doctor account is inactive");
        }
        const isMatch = await doctor.comparePassword(password);
        if (!isMatch) {
            throw new Error("invalid credentials");
        }
        await doctor.update({
            last_login_at: new Date(),
        });
        const token = generateToken({
            id: doctor.id,
            role: doctor.role,
        });
        return({
            doctor: {
                id: doctor.id,
                name: doctor.name,
                email: doctor.email,
                phone: doctor.phone,
                role: doctor.role,
            }, token
        });
    };

    getProfile = async (user) => {
        const doctor = await this.authRepository.getProfile(
            user.id
        );
        if (!doctor) {
            throw new Error("doctor profile not found");
        }
        return doctor;
    };

    updateProfile = async (user, payload, file) => {
        const existingDoctor = await this.authRepository.getProfile(user.id);
        if (!existingDoctor) {
            throw new Error("doctor profile not found");
        }
        const updatePayload = {
            specialization: payload.specialization,
            department: payload.department,
            qualification: payload.qualification,
            experience_year: payload.experience_year,
            gender: payload.gender,
            hospital_name: payload.hospital_name,
            date_of_birth: payload.date_of_birth,
            bio: payload.bio,
            language: payload.language,
            profile_image: file ? file.path : existingDoctor.profile_image,
            address: payload.address,
            city: payload.city,
            state: payload.state,
            country: payload.country,
            pincode: payload.pincode,
            latitude: payload.latitude,
            longitude: payload.longitude,
            updated_by: user.id                
        };
        return await this.authRepository.updateProfile(
            user.id, updatePayload
        );
    };
};

module.exports = AuthService;