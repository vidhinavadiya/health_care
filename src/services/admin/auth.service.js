const { AuthRepository } = require('../../repositories');
const { generateToken } = require('../../utils/jwt');

class AuthService {

    constructor () {
        this.authRepository = new AuthRepository();
    }
    //login admin
    loginAdmin = async (payload) => {
        const { email, password } = payload;
        const admin = await this.authRepository.findAdminByEmail(email);
        if (!admin) {
            throw new Error("admin not found");
        }
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            throw new Error("invalid credentials");        
        }
        const token = generateToken({
            id: admin.id,
            role: admin.role
        });
        return {
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
            token
        };
    };
}

module.exports = AuthService;