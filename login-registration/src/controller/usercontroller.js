const userService = require('../services/userservice')

const userController = {
    getProfile: async (req, res, next) => {
        const userid = req.user
        const userdata = await userService.getProfile(userid.id)
        return res.status(200).json(
            {   
                "status": 0,
                "message": "sukses",
                "data": userdata
            }
        )
    },

    updateProfile: async (req, res, next) => {
        const userid = req.user
        const userbody = req.body
        const userdata = await userService.updateProfile(userid.id, userbody)
        return res.status(200).json(
            {   
                "status": 0,
                "message": "Update Pofile berhasil",
                "data": userdata
            }
        )
    },

    updateProfileImage: async (req, res, next) => {
        const userid = req.user
        const userbody = req.body
        const validimg = (img) => {
            return img.match(/\.(jpeg|png)$/) !=null
        }

        if (!validimg(userbody.profile_image)){
            return res.status(400).json(
            {   
                "status": 102,
                "message": "format img tidak sesuai",
                "data": null
            })
        }

        const userdata = await userService.updateProfileImage(userid.id, userbody.profile_image)
        return res.status(200).json(
            {   
                "status": 0,
                "message": "Update Profile Image berhasil",
                "data": userdata
            }
        )
    },
}

module.exports = userController