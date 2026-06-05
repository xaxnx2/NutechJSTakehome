const authService = require('../services/authservice')

const authController = {
    register: async (req, res, next) =>{
        const registerbody = req.body
        const registered = await authService.registerService(registerbody.first_name, registerbody.last_name, registerbody.email, registerbody.password)
        if (registered == null ){
            return res.status(400).json(
                {   
                    "status": 102,
                    "message": "Registrasi gagal email sudah di register",
                    "data": null
                }
            )
        }
        return res.status(201).json(
            {   
                "status": 0,
                "message": "Registrasi berhasil silahkan login",
                "data": null
            }
        )
    },

    login: async (req, res, next) => {
        const loginbody = req.body
        const token = await authService.loginService(loginbody.email, loginbody.password)
        if (token == null) {
            return res.status(401).json(
                {   
                    "status": 103,
                    "message": "Username atau password salah",
                    "data": null
                }
            )
        }
        return res.status(200).json(
            {
                "status": 0,
                "message": "Login Sukses",
                "data": {
                    "token": token
                }

            }
        )
    },
}

module.exports = authController