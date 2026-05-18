const jwt = require('jsonwebtoken');

const auth = (...roles) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new Error("token required");
            }

            const token = authHeader.replace(
                'Bearer ',
                ''
            );
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );
            req.user = decoded;
            //role check
            if (
                roles.length && !roles.includes(
                    decoded.role
                )
            ) {
                throw new Error("unauthorized");
            }
            next();
        } catch (error) {
            return res.status(401).send({
                success: false,
                message: error.message
            });
        }
    };
};

module.exports = auth;