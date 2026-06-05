const balanceServices = require('../services/balanceservices')

const balanceController = {
    createBalance: async (req, res ,next) => {
        const created = await balanceServices.createBalance(req.user.id)
        return res.status(201).json(
            {   
                "status": 0,
                "message": "Balance telah dibuat data balance bisa disimpan sekarang",
                "data": null
            }
        )
    },

    getBalance: async (req, res, next) => {
        const balance = await balanceServices.getBalance(req.user.id)
        return res.status(200).json(
            {   
                "status": 0,
                "message": "Get Balance Berhasil",
                "data": balance
            }
        )
    },

    updateBalance: async (req, res, next) => {
        const balancebody = req.body
        const balance = await balanceServices.updateBalance(req.user.id, balancebody.top_up_amount)
        return res.status(200).json(
            {   
                "status": 0,
                "message": "Get Balance Berhasil",
                "data": balance
            }
        )
    }
}

module.exports = balanceController