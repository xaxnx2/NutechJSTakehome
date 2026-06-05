const servicesRepo = require('../repositories/servicesRepo')

const servicesService = {
    getServices: async () => {
        const servicesfound = await servicesRepo.getallservices()
        return servicesfound
    },
}

module.exports = servicesService