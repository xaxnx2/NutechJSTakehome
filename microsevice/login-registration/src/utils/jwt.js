const jwt = require('jsonwebtoken')
require('dotenv').config();
const secret = process.env.JWT_SECRET

const jwtMethods = {
    createToken:  (payload) => {
        const res = jwt.sign(payload,secret,{expiresIn:'12h'})
        return res
    },

    verifyToken:  (token) => {
        try{
            const res = jwt.verify(token, secret);
            return res
        } catch(err) {
            return null
        }
    },

}


module.exports = jwtMethods