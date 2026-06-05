const servicesService = require('../services/servicesservice')

const serviceController = {
    getServices: async (req, res, next) => {
        const servicesdata = await servicesService.getServices()
        return res.status(200).json(
            {   
                "status": 0,
                "message": "sukses",
                "data": servicesdata
            }
        )
    },


}

module.exports = serviceController