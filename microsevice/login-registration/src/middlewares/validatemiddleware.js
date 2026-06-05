
const validateMiddleware = {
    validateRegister: (req, res, next) => {
        const userData = req.body
        if (userData.first_name == null || userData.last_name == null || userData.email == null || userData.password == null){
            return res.status(400).json(
            {   
                "status": 102,
                "message": "Paramter ada yang kosong",
                "data": null
            })
        }
        if (userData.password.length < 8){
            return res.status(400).json(
            {   
                "status": 102,
                "message": "Paramter password harus lebih dari 8 huruf",
                "data": null
            })
        }
        const validEmail = (email) => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(email);
        }
        if(!validEmail(userData.email)){
            return res.status(400).json(
            {   
                "status": 102,
                "message": "Paramter email tidak sesuai format",
                "data": null
            })
        }

        next()

    },

    validateLogin: (req, res, next) => {
        const userData = req.body
        if (userData.email == null || userData.password == null){
            return res.status(400).json(
            {   
                "status": 102,
                "message": "Paramter ada yang kosong",
                "data": null
            })
        }
        next()
    
    }
}

module.exports = validateMiddleware