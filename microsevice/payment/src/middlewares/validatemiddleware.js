
const validateMiddleware = {
    validateBalance: (req, res, next) => {
        const balancedata = req.body
        if (balancedata.top_up_amount <= 0 || !Number.isInteger(balancedata.top_up_amount)){
            return res.status(400).json(
            {   
                "status": 102,
                "message": "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
                "data": null
            })
        }

        next()

    },

}

module.exports = validateMiddleware