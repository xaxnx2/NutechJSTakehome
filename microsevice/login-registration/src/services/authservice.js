const userRepo = require('../repositories/userRepo')
const encrypt = require('bcryptjs')
const jwt = require('../utils/jwt')
const rabbitmq = require('../utils/rabbitmq')

const authService = {
    registerService: async (first_name, last_name, email, password) => {
        const emailfound = await userRepo.findByEmail(email)
        if (emailfound){
            return null
        }
        const hashedpass = encrypt.hashSync(password, 5)
        const registerd = await userRepo.create({first_name,last_name,email,password: hashedpass})
        await rabbitmq.publishUserCreated(registerd.id)
        return registerd
    },
    
    loginService: async (email, password) => {
        const userfound = await userRepo.findByEmail(email)
        if (!encrypt.compareSync(password,userfound.password)){
            return null
        }
        const payload = {
            id: userfound.id ,
            email: userfound.email
        }
        const token = jwt.createToken(payload)
        return token
    }
}

module.exports = authService