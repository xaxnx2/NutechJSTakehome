const bannerService = require('../services/bannerservice')

const bannerController = {
    getBanner: async (req, res, next) => {
        const bannerdata = await bannerService.getBanners()
        return res.status(200).json(
            {   
                "status": 0,
                "message": "sukses",
                "data": bannerdata
            }
        )
    },


}

module.exports = bannerController