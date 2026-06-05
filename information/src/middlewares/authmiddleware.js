const {verifyToken} = require('../utils/jwt')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ status: 108, message: 'Token tidak valid atau tidak ada', data: null })
    }

    const token = authHeader.split(' ')[1];

        const decode = verifyToken(token);
            if (decode == null) {
                return res.status(401).json({ status: 108, message: 'Token tidak valid atau kadaluwarsa', data: null });
            }
            req.user = { id: decode.id, email: decode.email }
            next();
}

module.exports = authMiddleware