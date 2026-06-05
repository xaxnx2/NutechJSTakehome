const userRepo = require('../repositories/userRepo')

const userService = {
    getProfile: async (id) => {
        const userfound = await userRepo.findByID(id)
        return userfound
    },
    
    updateProfile: async (id, fields) => {
        const allowed = {}
        if (fields.first_name){
            allowed.first_name = fields.first_name
        } 
        if (fields.last_name){
            allowed.last_name = fields.last_name
        } 

        const userupdated = await userRepo.update(id, allowed)
        return userupdated
    },

    updateProfileImage: async (id, profile_image) => {

        const userimageupdated = await userRepo.updateProfileImage(id, profile_image)
        return userimageupdated
    }
}

module.exports = userService