const bannerRepo = require('../repositories/bannerRepo')

const bannerService = {
    getBanners: async () => {
        const bannerfound = await bannerRepo.getallbanners()
        return bannerfound
    },
}

module.exports = bannerService